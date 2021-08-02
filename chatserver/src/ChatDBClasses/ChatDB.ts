import { checkIfUserExists } from '../generalFunctions';
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
    return this.findUserByName(username);
  }
  getGroup(id: string) {
    return this.findGroupById(id);
  }
  addGroup(name: string, members: string[]): Group {
    let existingMembers = members.filter((member) =>
      checkIfUserExists(member, this.allUsers),
    );
    let group = new Group(uuidv4(), name, existingMembers);
    this.allGroups.push(group);
    this.addGroupToUsers(group);
    return group;
  }

  addUser(name: string) {
    this.allUsers.push(new User(name));
  }

  addMessage(group: Group, msg: Message) {
    let groupToAdd = this.findGroupById(group.id);
    if (groupToAdd) groupToAdd.msgLog.push(msg);
  }

  removeUser(groupId: string, username: string) {
    this.removeFromGroups(groupId, username);
    this.removeFromUsers(groupId, username);
  }

  private removeFromGroups(groupId: string, username: string) {
    let objectToChange = this.findGroupById(groupId);
    if (objectToChange === undefined) return;
    let removeIndex = objectToChange.members.indexOf(username);
    if (removeIndex !== -1) objectToChange.members.splice(removeIndex, 1);
  }

  private removeFromUsers(groupId: string, username: string) {
    let objectToChange = this.findUserByName(username);
    if (objectToChange === undefined) return;
    let removeIndex = objectToChange.groups.indexOf(
      this.findGroupById(groupId),
    );
    if (removeIndex !== -1) objectToChange.groups.splice(removeIndex, 1);
  }

  private findGroupById = (id: string) => {
    return this.allGroups.find((group) => group.id === id);
  };

  private findUserByName = (username: string) => {
    return this.allUsers.find((user) => user.username === username);
  };

  private addGroupToUsers = (group: Group) => {
    let groupMembers = [];
    group.members.forEach((member) => {
      groupMembers.push(this.findUserByName(member));
    });

    groupMembers.forEach((member) => {
      member.groups.push(group);
    });
  };
}
