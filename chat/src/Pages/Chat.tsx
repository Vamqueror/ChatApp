import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import ChatLog from '../ChatLog';
import { useLocation, useHistory } from "react-router-dom"
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Group from '../Group';
import Conversations from '../Conversations';
import Message from '../Message';

//const allRooms=[{id:44, name: "the boys"},{id:22, name: "papapos"},{id:55, name: "sad face"}]
const allGroups=[new Group (44,"the boys"),new Group(22, "papapos"),new Group(55,"sad face")]

const Chat = () => {
    
    const [currentGroup,setCurrentGroup]=useState(allGroups[0])
    const location = useLocation<{ Username: string }>()
    const [myGroups,setGroups]=useState(allGroups)
    let navigate = useHistory();

    /* const handleRoomChange=(obj:{id :number,name:string})=>{
        setRoom(obj)
    } */

    const handleGroupChange=(id:number)=>{
        let objToChange
        if(objToChange=allGroups.find(obj=>obj.id==id))
             setCurrentGroup(objToChange)
    }

    const updateGroupLog=(msg:Message)=>{
        let arr=[...myGroups]
        let objectToChange
        if(objectToChange=arr.find(obj=>obj.id==currentGroup.id))
            objectToChange.msgLog=[...objectToChange.msgLog,msg]
            console.log(objectToChange)
        setGroups(arr)
    }

    useEffect(()=>{
        let objectToChange
        if(objectToChange=myGroups.find(obj=>obj.id==currentGroup.id))
            setCurrentGroup(objectToChange)
    },[myGroups])

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
        console.log(currentGroup)
    })
    return <div>
        <Conversations groups={allGroups} setCurrentGroup={handleGroupChange}/>
        <ChatLog sendMessage={updateGroupLog} currentGroup={currentGroup} username={location.state?location.state.Username:""}/><br/>
        <Button className="middle" variant="danger" onClick={disconnectClick}>Disconnect</Button>
    </div>
}


export default Chat
