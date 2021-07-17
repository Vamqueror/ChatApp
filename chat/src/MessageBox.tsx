import { FC } from "react";

interface MessageProps {
    messageArray: string[];
}


const MessageBox: FC<MessageProps> = (props) => {

    const renderMessages=(): JSX.Element[] =>{
        return props.messageArray.map((element,index)=>{
            return <li key={index}>{element}</li>
        })
    }

    return <ul>
        {renderMessages()}
    </ul>
}

export default MessageBox;