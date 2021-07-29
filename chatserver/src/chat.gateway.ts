import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server as ServerIO } from 'socket.io';
import Group from "./ChatDBClasses/Group";
import Message from "./ChatDBClasses/Message";
import ChatManager from "./ChatManager";

@WebSocketGateway() // {cors: {origin: '*'}}
export class ChatGateway {
  @WebSocketServer()
  server: ServerIO;

  handleConnection(client: Socket) {
    const username = client.handshake.query.username
    if(Array.isArray(username)) return
    ChatManager.addUser(username)
    client.join(username)
    console.log(username+" is logged in")
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data:{message: Message, group: Group, sender: string}): void {
    let message=data.message,group=data.group,sender=data.sender
    let receivers = group.members.filter(m => m !== sender)
    receivers.forEach(reciever => {
      console.log(`sending to ${reciever}`)
      this.server.to(reciever).emit('message',{message,groupid:group.id})
    })
   // ChatManager.addMessage(group,message)
  }

  @SubscribeMessage('group-add')
  handleGroup(@ConnectedSocket() client: Socket, @MessageBody() data:{name:string,members:string[]}){
    let name=data.name,members=data.members
    let newGroup=ChatManager.addGroup(name,members)
    console.log(newGroup)
    newGroup.members.forEach(member=>{
      this.server.to(member).emit('group-add',{Group:newGroup})
    })
  }

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