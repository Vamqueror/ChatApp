import { Injectable } from '@nestjs/common';
import ChatManager from '../chatManager';

@Injectable()
export class UserService {
  getUser(username: string) {
    let user = ChatManager.getUser(username);
    return user ? user : [];
  }
  getAll() {
    return ChatManager;
  }
}
