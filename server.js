const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const CLIENT_SIDE_DIR = path.join(__dirname, 'CLIENT_SIDE');

const server = http.createServer((req, res) => {
  // Default to 'index.html' if root path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(CLIENT_SIDE_DIR, filePath);

  // Prevent directory traversal attacks
  if (!filePath.startsWith(CLIENT_SIDE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If file doesn't exist, check if this is a React Router route
      if (!path.extname(filePath)) {
        // Serve index.html for client-side routes
        const indexPath = path.join(CLIENT_SIDE_DIR, 'index.html');
        return serveFile(indexPath, res);
      }
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }

    // Serve the file
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const extname = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});