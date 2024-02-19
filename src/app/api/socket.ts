import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

let ioServer: Server;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!ioServer) {
    ioServer = new Server();
    ioServer.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('message', (message: string) => {
        console.log('Received message:', message);
        ioServer.emit('message', message);
      });
    });
  }

  res.end();
}
