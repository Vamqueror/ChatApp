import Group from "./Group"
import Message from "./Message"

export const splitMembersString = (members: string) => {
    return members.trim().replaceAll(" ", "").split(",").filter(word => word != "")
}
export const removeDuplicates = (members: string[]) => {
    return members.filter((val, index, self) =>
        index === self.findIndex((o) => (o === val))
    )
}

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
