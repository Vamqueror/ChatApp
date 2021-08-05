import { io, Socket } from "socket.io-client";
import Group from "../classes/Group";
import Message from "../classes/Message";
import {
  addMessageToGroup,
  addUserToGroup,
  leaveGroup,
  removeUserFromGroup,
  restrictHistory,
} from "../utils/groupFuncitons";

class ChatSocket {
  socket: Socket;

  constructor(username: string) {
    this.socket = io("http://localhost:4001", {
      query: { username },
      path: "/chat",
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  addConnectionErrorSocketEvent(setter:React.Dispatch<React.SetStateAction<string>>){
    this.socket.on("connect_error",(err)=>{
      setter("Unable to connect to server")
    })
  }

  addGroupSocketEvent(
    username: string,
    setMyGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) {
    this.socket.on("group-add", (data: { Group: Group }) => {
      let newGroup = data.Group;
      if (data.Group.isDM === false)
        newGroup = restrictHistory(username, data.Group);
      setMyGroups((arr) => [...arr, newGroup]);
    });
  }

  addMsgSocketEvent(
    myGroups: Group[],
    setMyGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) {
    const addmsg = (data: { message: Message; groupid: string }) => {
      let arr = addMessageToGroup([...myGroups], data.message, data.groupid);
      if (arr) setMyGroups(arr);
    };
    this.socket.on("message", addmsg);
  }

  addRemoveUserSocketEvent(
    myGroups: Group[],
    setMyGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    currentGroup: Group | null,
    setCurrentGroup: React.Dispatch<React.SetStateAction<Group | null>>,
    username: string
  ) {
    const rmUser = (data: { username: string; groupid: string }) => {
      let arr,
        leaving = false;
      if (username === data.username) {
        arr = leaveGroup([...myGroups], data.groupid);
        leaving = true;
      } else
        arr = removeUserFromGroup([...myGroups], data.groupid, data.username);
      setMyGroups(arr);
      if (leaving && currentGroup?.id === data.groupid) setCurrentGroup(null);
    };
    this.socket.on("remove-user", rmUser);
  }

  addInvalidUserSocketEvent(
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.socket.on("invalid-user", () => {
      setter("Invalid User");
    });
  }

  addInvalidDMSocketEvent(
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    const displayError = (data: { errorMsg: string }) => {
      setter(data.errorMsg);
    };
    this.socket.on("invalid-dm", displayError);
  }

  addAddUserSocketEvent(
    myGroups: Group[],
    setMyGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) {
    const addUser = (data: {
      groupid: string;
      newMember: string;
      broadcastMsg: Message;
    }) => {
      let arr = addUserToGroup(
        [...myGroups],
        data.groupid,
        data.newMember,
        data.broadcastMsg
      );
      setMyGroups(arr);
    };
    this.socket.on("add-user", addUser);
  }

  emitMessage(msg: Message, currentGroup: Group, username: string) {
    this.socket.emit("message", {
      message: msg,
      group: currentGroup,
      sender: username,
    });
  }
  emitRemoveUser(name: string, groupid: string) {
    this.socket.emit("remove-user", { name, groupid });
  }

  emitGroupAdd(name: string, members: string[], isDM: boolean) {
    this.socket.emit("group-add", { name, members, isDM });
  }

  emitAddUser(groupid: string, username: string) {
    this.socket.emit("add-user", { name: username, groupid });
  }

  off(event: string) {
    this.socket.off(event);
  }
}

export default ChatSocket;
