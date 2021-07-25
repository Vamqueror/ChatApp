import { addGroupToUsers, checkIfUserExists } from "../generalFunctions";
import Group from "./Group";
import User from "./User";
import { v4 as uuidv4 } from 'uuid';
import Message from "./Message";

export default class ChatDB{
     allGroups:Group[]
     allUsers:User[]
    
    constructor(){
        this.allGroups=[]
        this.allUsers=[]
    }

    addGroup(name:string,members:string[]){
        let existingMembers=members.filter(member=>checkIfUserExists(member,this.allUsers))
        let group=new Group(uuidv4(),name,existingMembers)
        this.allGroups.push(group)
        addGroupToUsers(this.allUsers,group)
    }

    addUser(name:string){
        this.allUsers.push(new User(name))
    }

    addMessage(group:Group,msg:Message){
        let groupToAdd=this.allGroups.find(myGroup=>JSON.stringify(myGroup)===JSON.stringify(group))
        groupToAdd.msgLog.push(msg)
    }
}