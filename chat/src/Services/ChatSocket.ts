import { io, Socket } from "socket.io-client";
import Group from "../classes/Group";
import Message from "../classes/Message";
import {
  addMessageToGroup,
  addUserToGroup,
  leaveGroup,
  removeUserFromGroup,
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

  addGroupSocketEvent(
    setMyGroups: React.Dispatch<React.SetStateAction<Group[]>>
  ) {
    this.socket.on("group-add", (data: any) => {
      setMyGroups((arr) => [...arr, data.Group]);
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

  addInvalidUserSocketEvent(setter: any) {
    this.socket.on("invalid-user", () => {
      setter("Invalid User");
    });
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

  emitGroupAdd(name: string, members: string[]) {
    this.socket.emit("group-add", { name, members });
  }

  emitAddUser(groupid: string, username: string) {
    this.socket.emit("add-user", { name: username, groupid });
  }

  off(event: string) {
    this.socket.off(event);
  }
}

export default ChatSocket;
