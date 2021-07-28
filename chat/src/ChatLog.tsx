import { useRef } from 'react';
import './App.css';
import MessageBox from './MessageBox';
import Message from './Message';
import { FC } from "react";
import { Button, Form } from 'react-bootstrap';
import { useCurrentGroup, useSendMessage } from './Context/GroupProvider';


interface user {
    username: string
}

const ChatLog: FC<user> = (props) => {
    const input = useRef("")
    const sendMessage = useSendMessage()
    const currentGroup = useCurrentGroup()



    const resetInput = () => {
        let component = document.getElementById('MessageInput')
        input.current = ""
        if (component && component instanceof HTMLInputElement)
            component.value = ""

    }

    const handleChange = (e: any) => {
        input.current = e.target.value
    }

    const sendClick = (e: any) => {
        e.preventDefault()
        let user = props.username, messageText = input.current
        // setMessages(arr => [...arr, new Message(user, messageText)])
        sendMessage(new Message(user, messageText))
        //socket.emit('message', { user, messageText })
        resetInput()
    }



    return (
        <div>
            <MessageBox messageArray={currentGroup === null ? [] : currentGroup.msgLog} /><br />
            <Form>
                <Form.Group >
                    <Form.Control id="MessageInput" type="text" placeholder="Type a message" onChange={handleChange}></Form.Control>
                    <Button variant="success" onClick={(e) => sendClick(e)}>Send</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default ChatLog