import fs from 'fs';

export function writeCookiesToNetscape(jsonCookiesStr: string, destPath: string): boolean {
  try {
    const cookies = JSON.parse(jsonCookiesStr);
    let netscape = "# Netscape HTTP Cookie File\n# http://curl.haxx.se/rfc/cookie_spec.html\n# This is a generated file!  Do not edit.\n\n";
    
    for (const cookie of cookies) {
      const domain = cookie.domain || '';
      const includeSubdomains = domain.startsWith('.') ? 'TRUE' : 'FALSE';
      const path = cookie.path || '/';
      const secure = cookie.secure ? 'TRUE' : 'FALSE';
      const expiration = cookie.expirationDate ? Math.floor(cookie.expirationDate) : 0;
      const name = cookie.name || '';
      const value = cookie.value || '';
      
      netscape += `${domain}\t${includeSubdomains}\t${path}\t${secure}\t${expiration}\t${name}\t${value}\n`;
    }
    
    fs.writeFileSync(destPath, netscape, 'utf8');
    return true;
  } catch (error) {
    console.error("Failed to parse and write cookies:", error);
    return false;
  }
}
