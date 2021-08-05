import Group from "../classes/Group";

export const groupName = (group: Group, username: string) => {
  if (!group.isDM) return group.name;
  return dmName(group, username);
};

const dmName = (group: Group, username: string) => {
  let name = group.name.concat().split("-");
  for (let str of name) {
    if (str !== username) return str;
  }
  return group.name;
};
