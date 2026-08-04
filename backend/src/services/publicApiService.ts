import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { config } from '../config/env';
import { generateJobId } from '../utils/helpers';

// We can define a specialized JobStatus for public API to provide verbose logs
export interface PublicJobStatus {
  jobId: string;
  status: 'queued' | 'fetching' | 'converting_rapidapi' | 'downloading_to_server' | 'uploading_to_tmpfiles' | 'completed' | 'failed';
  progress: number;
  logs: string[];
  downloadUrl?: string; // The final tmpfiles.org URL
  error?: string;
  createdAt: number;
}

const publicJobs = new Map<string, PublicJobStatus>();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'f5e656d1c5msh8b29c8cff437605p1930c3jsn81b4b7d5bda7';
const RAPIDAPI_HOST = 'youtube-mp4-mp3-downloader.p.rapidapi.com';

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match ? match[1] : null;
}

function updateLog(jobId: string, log: string, status?: PublicJobStatus['status'], progress?: number) {
  const job = publicJobs.get(jobId);
  if (!job) return;
  job.logs.push(`[${new Date().toISOString()}] ${log}`);
  if (status) job.status = status;
  if (progress !== undefined) job.progress = progress;
}

export function getPublicJobStatus(jobId: string): PublicJobStatus | undefined {
  return publicJobs.get(jobId);
}

export function startPublicDownload(url: string, format: 'mp3' | 'mp4', quality: string): string {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const jobId = generateJobId();
  const job: PublicJobStatus = {
    jobId,
    status: 'queued',
    progress: 0,
    logs: [`[${new Date().toISOString()}] Job created for video ID: ${videoId}`],
    createdAt: Date.now()
  };
  publicJobs.set(jobId, job);

  // Run asynchronously in the background
  processPublicDownload(jobId, videoId, format, quality).catch(err => {
    updateLog(jobId, `Fatal Error: ${err.message}`, 'failed', 0);
    const j = publicJobs.get(jobId);
    if (j) j.error = err.message;
  });

  return jobId;
}

async function processPublicDownload(jobId: string, videoId: string, formatType: 'mp3' | 'mp4', quality: string) {
  updateLog(jobId, 'Contacting RapidAPI to begin conversion...', 'fetching', 5);

  const formatParam = formatType === 'mp3' ? 'mp3' : quality.replace('p', '');
  const audioQualityParam = formatType === 'mp3' ? quality : '128';

  const rapidApiUrl = `https://${RAPIDAPI_HOST}/api/v1/download?format=${formatParam}&id=${videoId}&audioQuality=${audioQualityParam}&addInfo=false&allowExtendedDuration=false`;

  const response = await fetch(rapidApiUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RapidAPI Error: ${response.statusText}`);
  }

  const data = await response.json() as any;
  if (!data.success || !data.progressId) {
    throw new Error('Failed to initiate RapidAPI conversion.');
  }

  updateLog(jobId, `RapidAPI conversion started. Progress ID: ${data.progressId}`, 'converting_rapidapi', 10);

  // Poll RapidAPI
  const rapidApiUrlResult = await pollRapidApi(jobId, data.progressId);
  updateLog(jobId, 'RapidAPI conversion completed successfully.', 'converting_rapidapi', 50);

  // Download to local server
  updateLog(jobId, 'Downloading file to our servers...', 'downloading_to_server', 55);
  const localFilePath = await downloadToLocal(jobId, rapidApiUrlResult, formatType);
  updateLog(jobId, `File downloaded locally to ${localFilePath}`, 'downloading_to_server', 70);

  // Upload to tmpfiles
  updateLog(jobId, 'Uploading file to tmpfiles.org...', 'uploading_to_tmpfiles', 75);
  const tmpfilesUrl = await uploadToTmpFiles(localFilePath);
  updateLog(jobId, `Upload successful. Direct URL: ${tmpfilesUrl}`, 'completed', 100);

  const job = publicJobs.get(jobId);
  if (job) {
    job.downloadUrl = tmpfilesUrl;
  }

  // Cleanup local file
  try {
    fs.unlinkSync(localFilePath);
    updateLog(jobId, 'Cleaned up temporary local files.');
  } catch (e) {
    console.error('Failed to cleanup file:', localFilePath);
  }
}

async function pollRapidApi(jobId: string, progressId: string): Promise<string> {
  const maxAttempts = 120; // 4 minutes
  
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(`https://${RAPIDAPI_HOST}/api/v1/progress?id=${progressId}`, {
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    });

    if (res.ok) {
      const data = await res.json() as any;
      if (data.finished && data.downloadUrl) {
        return data.downloadUrl;
      }
      // Update progress log occasionally
      if (i % 3 === 0) {
         updateLog(jobId, `RapidAPI converting... (${data.progress ? Math.round(data.progress/10) : 0}%)`);
      }
    }
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  throw new Error('RapidAPI conversion timed out.');
}

async function downloadToLocal(jobId: string, url: string, ext: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error('Failed to download file from RapidAPI');
  }

  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir, { recursive: true });
  }

  const filePath = path.join(config.tempDir, `${jobId}.${ext}`);
  const dest = fs.createWriteStream(filePath);
  
  await pipeline(response.body, dest);
  return filePath;
}

async function uploadToTmpFiles(filePath: string): Promise<string> {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await fetch('https://tmpfiles.org/api/v1/upload', { 
    method: 'POST', 
    body: form 
  });
  
  if (!response.ok) {
    throw new Error(`tmpfiles.org upload failed with status ${response.status}`);
  }

  const result = await response.json() as { status: string; data: { url: string } };
  if (result.status !== 'success' || !result.data?.url) {
    throw new Error('tmpfiles.org upload failed: unexpected response');
  }

  // tmpfiles.org returns a page URL, we must scrape the actual direct download URL
  const pageResponse = await fetch(result.data.url);
  const pageHtml = await pageResponse.text();
  
  const match = pageHtml.match(/href="(https:\/\/tmpfiles\.org\/dl\/[^"]+)"/);
  if (!match || !match[1]) {
    throw new Error('Could not find the direct download link on tmpfiles.org page');
  }

  return match[1];
}

export function cleanupOldPublicJobs(): void {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 hour
  for (const [jobId, job] of publicJobs.entries()) {
    if (now - job.createdAt > maxAge) publicJobs.delete(jobId);
  }
}
