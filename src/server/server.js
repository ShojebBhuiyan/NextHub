const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
