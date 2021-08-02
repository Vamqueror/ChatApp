import Group from "../classes/Group";
import Message from "../classes/Message";

export const addMessageToGroup = (
  groups: Group[],
  msg: Message,
  groupid: string | null | undefined
) => {
  if (groupid == null) return groups;
  let objectToChange = findGroupById(groups, groupid);
  if (objectToChange) objectToChange.msgLog.push(msg);
  return groups;
};

export const addUserToGroup=(groups:Group[],groupid: string | null | undefined,username:string,msgToAdd:Message)=>{
  if (groupid == null) return groups;
  let objectToChange = findGroupById(groups, groupid);
  if (objectToChange){
    objectToChange.msgLog.push(msgToAdd)
    objectToChange.members.push(username)
  }
  return groups
}

export const removeUserFromGroup = (
  groups: Group[],
  groupid: string | null | undefined,
  username: string
) => {
  if (groupid == null) return groups;
  let objectToChange = findGroupById(groups, groupid);
  if (objectToChange) {
    let indexToRemove = objectToChange.members.indexOf(username);
    if (indexToRemove != -1) objectToChange.members.splice(indexToRemove, 1);
  }
  return groups;
};

export const leaveGroup = (
  groups: Group[],
  groupid: string | null | undefined
) => {
  if (groupid == null) return groups;
  let objectToRemove = findGroupById(groups, groupid);
  if (objectToRemove) {
    let indexToRemove = groups.indexOf(objectToRemove);
    if (indexToRemove != -1) groups.splice(indexToRemove, 1);
  }
  return groups;
};

export const findGroupById = (groups: Group[], id: string) => {
  return groups.find((group) => group.id === id);
};
