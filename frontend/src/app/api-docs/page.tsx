'use client';

import React from 'react';

export default function ApiDocsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">
            API <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-lg text-muted">
            Integrate MediaFlow's fast and reliable media downloading directly into your own applications.
          </p>
        </div>

        <div className="glass rounded-xl p-6 sm:p-8 space-y-8 fade-in fade-in-delay-1 text-sm text-muted leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 font-heading">1. Initiating the Download</h2>
            <p className="mb-4">
              To allow your application to show loading states and prevent HTTP timeouts, the API uses an <strong>Asynchronous Polling</strong> design. 
              Make a <code>GET</code> or <code>POST</code> request to initiate the download:
            </p>
            <div className="bg-black/30 border border-card-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-violet-300">
              GET /api/v1/public/download?url=https://youtube.com/watch?v=dQw4w9WgXcQ&format=mp3&quality=320
            </div>
            
            <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Query Parameters</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li><code>url</code> (required): The YouTube URL to download.</li>
              <li><code>format</code> (optional): <code>mp3</code> or <code>mp4</code> (default: mp4).</li>
              <li><code>quality</code> (optional): E.g. <code>320</code> for audio, <code>1080p</code> for video.</li>
            </ul>

            <h3 className="text-sm font-semibold text-foreground mb-2">Success Response:</h3>
            <pre className="bg-black/30 border border-card-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-green-300">
{`{
  "success": true,
  "jobId": "f7a91823-c128-48b2",
  "statusUrl": "https://your-domain.com/api/v1/public/status/f7a91823-c128-48b2",
  "message": "Download initiated. Poll the statusUrl to get logs and the final download link."
}`}
            </pre>
          </section>

          <hr className="border-card-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 font-heading">2. Polling for Logs and Progress</h2>
            <p className="mb-4">
              Use the <code>statusUrl</code> returned from the initiation step. Make a <code>GET</code> request every few seconds to receive real-time logs and progress updates.
            </p>
            <div className="bg-black/30 border border-card-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-violet-300">
              GET /api/v1/public/status/:jobId
            </div>

            <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">In-Progress Response:</h3>
            <pre className="bg-black/30 border border-card-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-green-300">
{`{
  "success": true,
  "jobId": "f7a91823-c128-48b2",
  "status": "downloading_to_server",
  "progress": 55,
  "logs": [
    "[2026-08-04T20:10:00Z] Job created for video ID: dQw4w9WgXcQ",
    "[2026-08-04T20:10:01Z] Contacting RapidAPI to begin conversion...",
    "[2026-08-04T20:10:04Z] RapidAPI conversion completed successfully.",
    "[2026-08-04T20:10:05Z] Downloading file to our servers..."
  ],
  "downloadUrl": null
}`}
            </pre>
          </section>

          <hr className="border-card-border" />

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 font-heading">3. Retrieving the Final Link</h2>
            <p className="mb-4">
              Once the file is successfully processed and uploaded to our secure cloud storage, the status changes to <code>completed</code> and the final direct URL is provided in the <code>downloadUrl</code> field.
            </p>
            <pre className="bg-black/30 border border-card-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-green-400">
{`{
  "success": true,
  "jobId": "f7a91823-c128-48b2",
  "status": "completed",
  "progress": 100,
  "logs": [
    ...
    "[2026-08-04T20:10:15Z] Upload successful. Direct URL: https://tmpfiles.org/dl/12345/dQw4w9WgXcQ.mp3"
  ],
  "downloadUrl": "https://tmpfiles.org/dl/12345/dQw4w9WgXcQ.mp3"
}`}
            </pre>
          </section>

          <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
            <h4 className="font-semibold text-violet-300 mb-2">Rate Limits & Fair Use</h4>
            <p className="text-xs text-muted">
              Please note that public API access is provided on a fair-use basis. Excessive requests from a single IP or client may be temporarily rate-limited to ensure quality of service for all users. If you require higher limits, please contact us for a dedicated API key.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
