import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = require('socket.io-client')('http://localhost:3000'); // Replace with your server URL
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    // Listen to 'messageToClient' event from the server
    this.socket.on('messageToClient', (data) => {
      console.log(`Received serverEvent: ${data}`);
    });
  }

  // Emit 'messageToServer' event to the server
  emitClientEvent(payload: any) {
    this.socket.emit('messageToServer', { payload });
  }
}