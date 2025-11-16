import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Chisme } from './entities/chisme.entity';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const allowed =
        process.env.NODE_ENV !== 'development'
          ? process.env.ALLOWED_ORIGIN
          : '*';

      if (allowed === '*' || origin === allowed) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed'));
      }
    },
  },
  namespace: 'chismes',
})
export class ChismesGateway {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Client connected to ChismesGateway');
  }

  broadcast(chisme: Chisme) {
    this.server.emit('new-chisme', chisme);
  }
}
