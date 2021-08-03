import Message from "./Message";

export default class Group {
  id: string;
  name: string;
  members: string[];
  msgLog: Message[];
  isDM: boolean;

  constructor(id: string, name: string, members: string[], isDM: boolean) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.msgLog = [];
    this.isDM = isDM;
  }
}
