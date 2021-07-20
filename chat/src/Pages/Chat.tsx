import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import ChatLog from '../ChatLog';
import { useLocation, useHistory } from "react-router-dom"
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Conversations from '../Conversations';

const allRooms=[{id:44, name: "the boys"},{id:22, name: "papapos"},{id:55, name: "sad face"}]

const Chat = () => {
    

    const [currentRoom,setRoom]=useState({id:44, name: "the boys"})
    const location = useLocation<{ Username: string }>()
    let navigate = useHistory();

    const handleRoomChange=(obj:{id :number,name:string})=>{
        setRoom(obj)
    }

    const disconnectClick = (e: any) => {
        e.preventDefault()
        location.state.Username = ''
        navigate.push('/Login')
    }

    useEffect(() => {
        if (location.state == undefined || location.state.Username === '')
            navigate.push('/Login')
    }, [])

    useEffect(()=>{
        console.log(currentRoom)
    })
    return <div>
        <Conversations groups={allRooms} setCurrentGroup={handleRoomChange}/>
        <ChatLog username={location.state?location.state.Username:""}/><br/>
        <Button className="middle" variant="danger" onClick={disconnectClick}>Disconnect</Button>
    </div>
}


export default Chat
