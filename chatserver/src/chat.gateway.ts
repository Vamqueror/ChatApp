import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server as ServerIO } from 'socket.io';
import Group from './ChatDBClasses/Group';
import Message from './ChatDBClasses/Message';
import { ChatService } from './ChatModule/chat.service';

@WebSocketGateway({ path: '/chat', cors: { origin: '*' } }) // {cors: {origin: '*'}}
export class ChatGateway {
  @WebSocketServer()
  server: ServerIO;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const username = client.handshake.query.username;
    if (Array.isArray(username)) return;
    this.chatService.addUser(username); //check if exist
    client.join(username);
    console.log(username + ' is logged in');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: Message; group: Group; sender: string },
  ): void {
    let message = data.message,
      group = data.group,
      sender = data.sender;
    let receivers = this.chatService.messageHandler(group, sender, message);
    receivers.forEach((reciever) => {
      this.server.to(reciever).emit('message', { message, groupid: group.id });
    });
  }

  @SubscribeMessage('group-add')
  handleGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { name: string; members: string[]; isDM: boolean },
  ) {
    let name = data.name,
      members = data.members,
      isDM = data.isDM;
    let newGroup = this.chatService.addGroup(name, members, isDM);
    newGroup.members.forEach((member) => {
      this.server.to(member).emit('group-add', { Group: newGroup });
    });
  }

  @SubscribeMessage('add-user')
  handleUserAdd(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { name: string; groupid: string },
  ) {
    let name = data.name,
      groupid = data.groupid;
    let membersBeforeAddon = this.chatService.currentMembers(groupid);
    let valid = this.chatService.addUserToGroup(groupid, name);
    if (!valid) client.emit('invalid-user');
    else {
      let groupToAdd = this.chatService.getGroup(groupid);
      this.server.to(name).emit('group-add', { Group: groupToAdd });
      membersBeforeAddon.forEach((member) => {
        this.server.to(member).emit('add-user', {
          groupid,
          newMember: name,
          broadcastMsg: groupToAdd.msgLog[groupToAdd.msgLog.length - 1],
        });
      });
    }
  }

  @SubscribeMessage('remove-user')
  handleUserRemove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { name: string; groupid: string },
  ) {
    let name = data.name,
      groupid = data.groupid;
    let membersBeforeRemoval = this.chatService.currentMembers(groupid);
    this.chatService.removeUserFromGroup(groupid, name);
    membersBeforeRemoval.forEach((member) => {
      this.server.to(member).emit('remove-user', { username: name, groupid });
    });
  }
}
