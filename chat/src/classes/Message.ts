export default class Message {
  Username: string;
  Text: string;
  constructor(username: string, text: string) {
    this.Username = username;
    this.Text = text;
  }
}
