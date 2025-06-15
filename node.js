const http = require('http');
const { spawn } = require('child_process');

const PORT = 8080; // fixed port here
let tunnelUrl = null;

// Start simple server on fixed port
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (tunnelUrl) {
    res.end(`<h1>Cloudflare Tunnel URL:</h1><a href="${tunnelUrl}" target="_blank">${tunnelUrl}</a>`);
  } else {
    res.end(`<h1>Waiting for Cloudflare tunnel URL...</h1><p>Local server running at http://localhost:${PORT}</p>`);
  }
});

server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
  startCloudflared(PORT);
});

function startCloudflared(port) {
  console.log('Starting cloudflared tunnel...');
  const tunnel = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${port}`]);

  function handleData(data) {
    const output = data.toString();
    process.stdout.write(output);

    const urlMatch = output.match(/https:\/\/[\w-]+\.trycloudflare\.com/);
    if (urlMatch && !tunnelUrl) {
      tunnelUrl = urlMatch[0];
      console.log(`\n✅ Detected Cloudflare tunnel URL: ${tunnelUrl}`);
    }
  }

  tunnel.stdout.on('data', handleData);
  tunnel.stderr.on('data', handleData);

  tunnel.on('exit', (code) => {
    console.log(`cloudflared exited with code ${code}`);
    tunnelUrl = null;
  });
}
