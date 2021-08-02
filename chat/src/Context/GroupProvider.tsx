import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  removeDuplicates,
  splitMembersString,
} from "../utils/generalFunctions";
import {
  addMessageToGroup,
  leaveGroup,
  removeUserFromGroup,
} from "../utils/groupFuncitons";
import Group from "../classes/Group";
import Message from "../classes/Message";
import { useChatSocket } from "./ChatSocketProvider";
import { fetchUserData } from "../Services/APIFetchService";

const GroupContext = createContext<Group[]>([]);
const CurrentGroupContext = createContext<Group | null>(null);
const CurrentGroupUpdateContext = createContext<Function>(() => {});
const SendMessageContext = createContext<Function>(() => {});
const AddGroupContext = createContext<Function>(() => {});
const RemoveUserContext = createContext<Function>(() => {});
const AddUserContext=createContext<Function>(() => {});

export function useGroup() {
  return useContext(GroupContext);
}

export function useAddUser(){
  return useContext(AddUserContext)
}
export function useSendMessage() {
  return useContext(SendMessageContext);
}

export function useCurrentGroup() {
  return useContext(CurrentGroupContext);
}

export function useCurrentGroupUpdate() {
  return useContext(CurrentGroupUpdateContext);
}

export function useAddGroup() {
  return useContext(AddGroupContext);
}

export function useRemoveUser() {
  return useContext(RemoveUserContext);
}

export const GroupProvider: FC<{ username: string; children: any }> = (
  props
) => {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const socket = useChatSocket();

  const addGroup = (name: string, members: string) => {
    if (socket == null) return;
    let noDups = removeDuplicates(splitMembersString(members));
    socket.emitGroupAdd(name, noDups);
  };

  const handleGroupChange = (id: string) => {
    let objToChange;
    if ((objToChange = myGroups.find((obj) => obj.id == id)))
      setCurrentGroup(objToChange);
  };

  const addUser=(name: string, groupid: string)=>{
    socket?.emitAddUser(groupid,name)
  }

  const removeUser = (name: string, groupid: string) => {
    socket?.emitRemoveUser(name, groupid);
  };

  const updateGroupLog = (msg: Message) => {
    if (currentGroup == null) return;
    let arr = addMessageToGroup([...myGroups], msg, currentGroup.id);
    if (arr) {
      setMyGroups(arr);
      socket?.emitMessage(msg, currentGroup, props.username);
    }
  };

  useEffect(() => {
    fetchUserData(props.username).then((data) => setMyGroups(data.groups));
  }, [socket]);

  useEffect(() => {
    socket?.addGroupSocketEvent(setMyGroups);
    return () => {
      socket?.off("group-add");
    };
  }, [socket]);

  useEffect(() => {
    socket?.addMsgSocketEvent(myGroups, setMyGroups);
    return () => {
      socket?.off("message");
    };
  }, [socket, myGroups]);

  useEffect(() => {
    socket?.addRemoveUserSocketEvent(
      myGroups,
      setMyGroups,
      currentGroup,
      setCurrentGroup,
      props.username
    );
    return () => {
      socket?.off("remove-user");
    };
  }, [socket, myGroups, currentGroup]);

  useEffect(()=>{
    socket?.addAddUserSocketEvent(myGroups,setMyGroups)
    return ()=> socket?.off("add-user")
  },[socket,myGroups])

  return (
    <GroupContext.Provider value={myGroups}>
      <AddGroupContext.Provider value={addGroup}>
        <CurrentGroupContext.Provider value={currentGroup}>
          <CurrentGroupUpdateContext.Provider value={handleGroupChange}>
            <SendMessageContext.Provider value={updateGroupLog}>
              <RemoveUserContext.Provider value={removeUser}>
                <AddUserContext.Provider value={addUser}>
                {props.children}
                </AddUserContext.Provider>
              </RemoveUserContext.Provider>
            </SendMessageContext.Provider>
          </CurrentGroupUpdateContext.Provider>
        </CurrentGroupContext.Provider>
      </AddGroupContext.Provider>
    </GroupContext.Provider>
  );
};
