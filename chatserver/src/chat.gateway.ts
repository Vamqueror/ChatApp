import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway {@WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: {usename:string,message:string}): void {
    this.server.emit('message', message);
  }
}