export default class Message {
  Username: string;
  Text: string;
  isStatus: boolean;
  constructor(username: string, text: string, isStatus = false) {
    this.Username = username;
    this.Text = text;
    this.isStatus = isStatus;
  }
}
