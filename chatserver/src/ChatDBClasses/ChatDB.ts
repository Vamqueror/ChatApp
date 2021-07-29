import { addGroupToUsers, checkIfUserExists } from '../generalFunctions';
import Group from './Group';
import User from './User';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';

export default class ChatDB {
  allGroups: Group[];
  allUsers: User[];

  constructor() {
    this.allGroups = [];
    this.allUsers = [];
  }
  getUser(username: string) {
    return this.findUserByName(this.allUsers, username);
  }
  addGroup(name: string, members: string[]): Group {
    let existingMembers = members.filter((member) =>
      checkIfUserExists(member, this.allUsers),
    );
    let group = new Group(uuidv4(), name, existingMembers);
    this.allGroups.push(group);
    addGroupToUsers(this.allUsers, group);
    return group;
  }

  addUser(name: string) {
    this.allUsers.push(new User(name));
  }

  addMessage(group: Group, msg: Message) {
    let groupToAdd = this.findGroupById(this.allGroups, group.id);
    if (groupToAdd) groupToAdd.msgLog.push(msg);
  }

  private findGroupById = (groups: Group[], id: string) => {
    return groups.find((group) => group.id === id);
  };

  private findUserByName = (users: User[], username: string) => {
    return users.find((user) => user.username === username);
  };
}
