import { addGroupToUsers, checkIfUserExists } from '../generalFunctions';
import Group from './Group';
import User from './User';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';

export default class ChatDB {
  private allGroups: Group[];
  private allUsers: User[];

  constructor() {
    this.allGroups = [];
    this.allUsers = [];
  }
  getUser(username: string) {
    return this.findUserByName(this.allUsers, username);
  }
  getGroup(id: string) {
    return this.findGroupById(this.allGroups, id);
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

  removeUser(groupId: string, username: string) {
    this.removeFromGroups(groupId, username);
    this.removeFromUsers(groupId, username);
  }

  private removeFromGroups(groupId: string, username: string) {
    let objectToChange = this.findGroupById(this.allGroups, groupId);
    if (objectToChange === undefined) return;
    let removeIndex = objectToChange.members.indexOf(username);
    if (removeIndex !== -1) objectToChange.members.splice(removeIndex, 1);
  }

  private removeFromUsers(groupId: string, username: string) {
    let objectToChange = this.findUserByName(this.allUsers, username);
    if (objectToChange === undefined) return;
    let removeIndex = objectToChange.groups.indexOf(
      this.findGroupById(this.allGroups, groupId),
    );
    if (removeIndex !== -1) objectToChange.groups.splice(removeIndex, 1);
  }

  private findGroupById = (groups: Group[], id: string) => {
    return groups.find((group) => group.id === id);
  };

  private findUserByName = (users: User[], username: string) => {
    return users.find((user) => user.username === username);
  };
}
