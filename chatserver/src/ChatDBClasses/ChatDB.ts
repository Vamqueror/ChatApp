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
  addGroup(name: string, members: string[],isDM:boolean): Group {
    let existingMembers = members.filter((member) =>
      this.checkIfUserExists(member),
    );
    let group = new Group(uuidv4(), name, existingMembers,isDM);
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

  addUserToGroup(groupId: string, username: string) {
    if (!this.isValid(groupId,username)) return false;
    this.addToGroups(groupId, username);
    this.addToUsers(groupId, username);
    return true;
  }

  removeUserFromGroup(groupId: string, username: string) {
    this.removeFromGroups(groupId, username);
    this.removeFromUsers(groupId, username);
  }

  private checkIfUserExists=(name:string)=>{
    let found = false;
    for(let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].username == name) {
            found = true;
            break;
        }
    }
    return found
}

  private isValid(groupId: string, username: string){
    if (this.findUserByName(username) === undefined) return false;
    let group=this.findGroupById(groupId)
    if(this.findUserInGroup(username,group)!==undefined) return false
    return true
  }

  private addToGroups(groupId: string, username: string) {
    let objectToChange = this.findGroupById(groupId);
    if (objectToChange === undefined) return;
    objectToChange.msgLog.push(new Message(username,"~ Group Broadcast: Hello!, I have joined",true))
    objectToChange.members.push(username);
  }

  private addToUsers(groupId: string, username: string) {
    let objectToChange = this.findUserByName(username);
    if (objectToChange === undefined) return;
    objectToChange.groups.push(this.findGroupById(groupId));
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

  findUserInGroup(username:string,group:Group){
    return group.members.find(member=>member===username)
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
