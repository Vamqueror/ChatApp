import { Injectable } from '@nestjs/common';
import Group from 'src/ChatDBClasses/Group';
import Message from 'src/ChatDBClasses/Message';
import ChatManager from '../chatManager';

@Injectable()
export class ChatService {
  addUser(username: string) {
    ChatManager.addUser(username);
  }
  messageHandler(group: Group, sender: string, message: Message) {
    ChatManager.addMessage(group, message);
    return group.members.filter((m) => m !== sender);
  }
  addGroup(name: string, members: string[], isDM: boolean) {
    return ChatManager.addGroup(name, members, isDM);
  }
  existingMembers(members: string[]) {
    return ChatManager.existingMembers(members);
  }
  checkIfUserExists(username: string) {
    return ChatManager.checkIfUserExists(username);
  }
  checkIfDMExists(members: string[]) {
    return ChatManager.checkIfDMExists(members);
  }
  currentMembers(groupid: string) {
    return [...ChatManager.getGroup(groupid).members];
  }
  addUserToGroup(groupid: string, username: string) {
    return ChatManager.addUserToGroup(groupid, username);
  }
  getGroup(groupid: string) {
    return ChatManager.getGroup(groupid);
  }
  removeUserFromGroup(groupid: string, username: string) {
    ChatManager.removeUserFromGroup(groupid, username);
  }
}
