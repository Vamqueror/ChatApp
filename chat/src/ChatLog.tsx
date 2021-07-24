import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MessageBox from './MessageBox';
import Message from './Message';
import { io } from "socket.io-client";
import { FC } from "react";
import { Button, Form } from 'react-bootstrap';
import Group from './Group';
import { useCurrentGroup, useSendMessage } from './Context/GroupProvider';

const socket = io('http://localhost:4001/')


interface user {
    username: string
}

const ChatLog: FC<user> = (props) => {
    const input = useRef("")
    const sendMessage=useSendMessage()
    const currentGroup=useCurrentGroup()



    const resetInput = () => {
        let component = document.getElementById('MessageInput')
        input.current = ""
        if (component && component instanceof HTMLInputElement)
            component.value = ""

    }

    const handleChange = (e: any) => {
        input.current = e.target.value
    }


  /*   useEffect(() => {
        socket.on('message', (msg: any) => {
            setMessages(arr => [...arr, new Message(msg.user, msg.messageText)])
        })
    }, []) */

    const sendClick = (e: any) => {
        e.preventDefault()
        let user = props.username, messageText = input.current
       // setMessages(arr => [...arr, new Message(user, messageText)])
        sendMessage(new Message(user,messageText))
        //socket.emit('message', { user, messageText })
        resetInput()
    }



    return (
        <div>
            <MessageBox messageArray={currentGroup===null?[]:currentGroup.msgLog} /><br />
            <Form>
                <Form.Group >
                    <Form.Control  id="MessageInput" type="text" placeholder="Type a message" onChange={handleChange}></Form.Control>
                    <Button variant="success" onClick={(e) => sendClick(e)}>Send</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default ChatLog