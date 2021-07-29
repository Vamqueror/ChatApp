import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  removeDuplicates,
  splitMembersString,
} from "../utils/generalFunctions";
import { addMessageToGroup } from "../utils/groupFuncitons";
import Group from "../classes/Group";
import Message from "../classes/Message";
import { useChatSocket } from "./ChatSocketProvider";

const GroupContext = createContext<Group[]>([]);
const CurrentGroupContext = createContext<Group | null>(null);
const CurrentGroupUpdateContext = createContext<Function>(() => {});
const SendMessageContext = createContext<Function>(() => {});
const AddGroupContext = createContext<Function>(() => {});

export function useGroup() {
  return useContext(GroupContext);
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

export const GroupProvider: FC<{ username: string; children: any }> = (
  props
) => {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const socket = useChatSocket();

  const addGroup = (name: string, members: string) => {
    if (socket == null) return;
    let noDups = removeDuplicates(splitMembersString(members));
    socket.emit("group-add", { name, members: noDups });
  };
  const handleGroupChange = (id: string) => {
    let objToChange;
    if ((objToChange = myGroups.find((obj) => obj.id == id)))
      setCurrentGroup(objToChange);
  };

  const updateGroupLog = (msg: Message) => {
    if (currentGroup == null) return;
    let arr = addMessageToGroup([...myGroups], msg, currentGroup.id);
    if (arr) {
      setMyGroups(arr);
      socket.emit("message", {
        message: msg,
        group: currentGroup,
        sender: props.username,
      });
    }
  };

  useEffect(() => {
    socket?.on("group-add", (data: any) => {
      setMyGroups((arr) => [...arr, data.Group]);
    });
    return () => {
      socket?.off("group-add");
    };
  }, [socket]);

  useEffect(() => {
    const addmsg = (data: { message: Message; groupid: string }) => {
      let arr = addMessageToGroup([...myGroups], data.message, data.groupid);
      if (arr) setMyGroups(arr);
    };
    socket?.on("message", addmsg);
    return () => {
      socket?.off("message");
    };
  }, [socket, myGroups]);

  return (
    <GroupContext.Provider value={myGroups}>
      <AddGroupContext.Provider value={addGroup}>
        <CurrentGroupContext.Provider value={currentGroup}>
          <CurrentGroupUpdateContext.Provider value={handleGroupChange}>
            <SendMessageContext.Provider value={updateGroupLog}>
              {props.children}
            </SendMessageContext.Provider>
          </CurrentGroupUpdateContext.Provider>
        </CurrentGroupContext.Provider>
      </AddGroupContext.Provider>
    </GroupContext.Provider>
  );
};
