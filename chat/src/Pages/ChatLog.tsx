import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import MessageBox from '../MessageBox';
import {useLocation,useHistory} from "react-router-dom"

function ChatLog() {
    const [messages, setMessages] = useState<string[]>([])
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

    const sendClick = (e: any) => {
        e.preventDefault()
        setMessages(arr => [...arr, location.state.Username+": "+input.current])
        let component=document.getElementById('MessageInput')
        if(component && component instanceof HTMLInputElement)
            component.value=""
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
                <button type="reset"onClick={(e) => sendClick(e)}>Send</button>
            </form>
            <button onClick={disconnectClick}>Disconnect</button>
        </div>
    );
}

export default ChatLog