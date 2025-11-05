
const { spawn } = require('child_process');
const net = require('net');

function findFreePort(start, end, cb) {
  let port = start;
  function check() {
    if (port > end) return cb(new Error('No free port'));
    const server = net.createServer();
    server.once('error', () => { port++; check(); });
    server.once('listening', () => { server.close(() => cb(null, port)); });
    server.listen(port);
  }
  check();
}

const startPort = 3000;
const endPort = 3010;

findFreePort(startPort, endPort, (err, port) => {
  if (err) {
    console.error('No free port between', startPort, 'and', endPort);
    process.exit(1);
  }
  console.log('Starting dev server on port', port);
  const child = spawn('npx', ['next', 'dev', '-p', String(port)], { stdio: 'inherit', shell: true });
  child.on('exit', (code) => process.exit(code));
});
