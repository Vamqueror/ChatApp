import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import ChatLog from '../ChatLog';
import { useLocation, useHistory } from "react-router-dom"
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal } from 'react-bootstrap';
import Group from '../Group';
import GroupList from '../GroupList';
import Message from '../Message';
import NewGroup from '../NewGroup';


//const allRooms=[{id:44, name: "the boys"},{id:22, name: "papapos"},{id:55, name: "sad face"}]
const allGroups=[new Group (44,"the boys"),new Group(22, "papapos"),new Group(55,"sad face")]

const Chat = () => {
    
    const [currentGroup,setCurrentGroup]=useState(allGroups[0])
    const [newGroupModal,setGroupModal]=useState(false)
    const location = useLocation<{ Username: string }>()
    const [myGroups,setGroups]=useState(allGroups)
    let navigate = useHistory();

    const closeModal=()=>{
        setGroupModal(false)
    }
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
        <Button  variant="danger" onClick={disconnectClick}>Disconnect</Button>
        <div className="chatApp">
        <GroupList groups={allGroups} setCurrentGroup={handleGroupChange}/>
        <ChatLog sendMessage={updateGroupLog} currentGroup={currentGroup} username={location.state?location.state.Username:""}/><br/>
        <Button onClick={()=>setGroupModal(true)}>Create New Group</Button>
        </div>
        <Modal show={newGroupModal} onHide={closeModal}>
        <NewGroup closeModal={closeModal}/>
        </Modal>
        </div>
    
}


export default Chat
