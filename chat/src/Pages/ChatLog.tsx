import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import MessageBox from '../MessageBox';
import {useLocation,useHistory} from "react-router-dom"
import Message from '../Message';
import { io } from "socket.io-client";

const socket= io('http://localhost:4001/')

function ChatLog() {
    const [messages, setMessages] = useState<Message[]>([])
    const input = useRef("")
    const location=useLocation<{Username:string}>()
    let navigate=useHistory();

    const handleChange = (e: any) => {
        input.current = e.target.value
    }

    useEffect(()=>{
        console.log(location.state)
        if(location.state==undefined||location.state.Username==='')
         navigate.push('/Login')
    },[])

    useEffect(()=>{
        socket.on('message',(msg:any)=>{
            console.log(msg)
            setMessages(arr=>[...arr,new Message(msg.user,msg.message)]) 
        })
    },[])

    const sendClick = (e: any) => {
        e.preventDefault()
        let user=location.state.Username
        let message=input.current
        setMessages(arr => [...arr,new Message(location.state.Username,input.current)])
        let component=document.getElementById('MessageInput')
        if(component && component instanceof HTMLInputElement)
            component.value=""
        socket.emit('message',{user,message})
    }

    const disconnectClick=(e:any)=>{
        e.preventDefault()
        location.state.Username=''
        navigate.push('/Login')
    }

    return (
        <div>
            <MessageBox messageArray={messages} /><br />
            <form>
                <input  id="MessageInput" type="text" placeholder="Type a message" onChange={handleChange}></input>
                <button onClick={(e) => sendClick(e)}>Send</button>
            </form>
            <button onClick={disconnectClick}>Disconnect</button>
        </div>
    );
}

export default ChatLog