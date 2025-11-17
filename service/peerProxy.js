const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  wss.on('connection', (ws) => {
    ws.isAlive = true;
    console.log('WebSocket client connected');
    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  setInterval(() => {
    wss.clients.forEach((client) => {
      if (!client.isAlive) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);
  return { broadcast };
}

module.exports = { peerProxy };
