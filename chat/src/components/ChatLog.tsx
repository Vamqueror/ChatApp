import { useRef } from "react";
import "../App.css";
import MessageBox from "./MessageBox";
import Message from "../classes/Message";
import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { useCurrentGroup, useSendMessage } from "../Context/GroupProvider";

interface user {
  username: string;
}

const ChatLog: FC<user> = (props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const input = useRef("");
  const sendMessage = useSendMessage();
  const currentGroup = useCurrentGroup();

  const handleChange = (e: any) => {
    input.current = e.target.value;
  };

  const sendClick = (e: any) => {
    e.preventDefault();
    let user = props.username,
      messageText = input.current;
    sendMessage(new Message(user, messageText));
    formRef?.current?.reset();
  };

  const chatform = currentGroup ? (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        sendClick(e);
      }}
    >
      <Form.Group>
        <Form.Control
          id="MessageInput"
          type="text"
          placeholder="Type a message"
          onChange={handleChange}
        ></Form.Control>
        <></>
        <Button variant="success" onClick={(e) => sendClick(e)}>
          Send
        </Button>
      </Form.Group>
    </Form>
  ) : (
    <></>
  );

  return (
    <div>
      <MessageBox
        messageArray={currentGroup === null ? [] : currentGroup.msgLog}
      />
      <br />
      {chatform}
    </div>
  );
};

export default ChatLog;
