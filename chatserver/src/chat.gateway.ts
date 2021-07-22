import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,Server as ServerIO } from 'socket.io';

@WebSocketGateway()
export class ChatGateway{
  @WebSocketServer()
  server:ServerIO;

  

}

/*  
onlineUsers=[];

handleConnection(client: any) {
  this.onlineUsers.push(client)
}

handleDisconnect(client: any) {
  let index;
  if(index=this.onlineUsers.indexOf(client)===-1)
    return;
  else
    this.onlineUsers.splice(index,1)
}

@SubscribeMessage('message')
handleMessage(@ConnectedSocket() client:Socket ,@MessageBody() message:{username:string,message:string}): void {
  this.broadcastExeptCurrent(message,client)
}

private broadcastExeptCurrent(message:any,client:any) {
  for(let user of this.onlineUsers){
    if(user===client)
      continue;
    else
      user.emit('message',message)
  }
} */