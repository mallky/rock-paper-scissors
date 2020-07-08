module.exports = (host) => {
  const WebSocket = require('ws');

  const wss = new WebSocket.Server({ port: 8443, host });

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
};
