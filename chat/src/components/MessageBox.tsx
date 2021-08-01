import { FC, useEffect, useRef } from "react";
import Message from "../classes/Message";

interface MessageProps {
  messageArray: Message[];
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
        <li
          className="message"
          key={index}
        >{`${element.Username}: ${element.Text}`}</li>
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
