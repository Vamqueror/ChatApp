import { Injectable } from '@nestjs/common';
import ChatManager from '../chatManager';

@Injectable()
export class UserService {
  getUser(username: string) {
    return ChatManager.getUser(username);
  }
  getAll() {
    return ChatManager;
  }
}
