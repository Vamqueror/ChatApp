import { FC } from "react";
import { io } from "socket.io-client";
import Message from './Message';

interface MessageProps {
    messageArray: Message[];
}

const MessageBox: FC<MessageProps> = (props) => {

    const renderMessages=(): JSX.Element[] =>{
        return props.messageArray.map((element,index)=>{
            return <li key={index}>{`${element.Username}:${element.Text}`}</li>
        })
    }

    return <ul>
        {renderMessages()}
    </ul>
}

export default MessageBox;