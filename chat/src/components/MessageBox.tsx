import { FC, useEffect, useRef } from "react";
import Message from "../classes/Message";
import { Card } from "react-bootstrap";

interface MessageProps {
  messageArray: Message[];
  username:string
}

const MessageBox: FC<MessageProps> = (props) => {
  const messageAutoScroll = useRef<any>(null);

  useEffect(() => {
    if (messageAutoScroll) {
      messageAutoScroll.current.addEventListener(
        "DOMNodeInserted",
        (event: any) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      );
    }
  }, []);

  const renderMessages = (): JSX.Element[] => {
    return props.messageArray.map((element, index) => {
      return (
        <Card
          bg={props.username===element.Username?"green":"info"}
          style={{ width: "fit-content",maxWidth: "60%" }}
          className={props.username===element.Username?"messageSelf":"message"}
          key={index}
        >
          <Card.Body style={{fontSize:"18px"}}>{element.Text}</Card.Body>
          {props.username!==element.Username && <Card.Title
            style={{
              alignSelf: "flex-end",
              borderTop: "2px solid",
              fontSize: "12px",
            }}
          >
            {element.Username}
          </Card.Title>}
        </Card>
      );
    });
  };

  return (
    <ul id="chatBox" className="chat" ref={messageAutoScroll}>
      {renderMessages()}
    </ul>
  );
};

export default MessageBox;
