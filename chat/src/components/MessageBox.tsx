import { FC } from "react";
import Message from '../classes/Message';

interface MessageProps {
    messageArray: Message[];
}

const MessageBox: FC<MessageProps> = (props) => {

    const renderMessages=(): JSX.Element[] =>{
        return props.messageArray.map((element,index)=>{
            return <li className="message" key={index}>{`${element.Username}: ${element.Text}`}</li>
        })
    }

    return <ul className="chat">
        {renderMessages()}
    </ul>
}

export default MessageBox;