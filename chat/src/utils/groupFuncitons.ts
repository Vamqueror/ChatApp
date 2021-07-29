import Group from "../classes/Group";
import Message from "../classes/Message";

export const addMessageToGroup = (groups: Group[], msg: Message, groupid: string | null | undefined) => {
    if (groupid == null) return [];
    let objectToChange = findGroupById(groups, groupid);
    console.log("Object To Change: ");
    console.log(objectToChange);
    if (objectToChange)
        objectToChange.msgLog.push(msg)

    return groups;
}

export const findGroupById = (groups: Group[], id: string) => {
    return groups.find(group => group.id === id)
}
