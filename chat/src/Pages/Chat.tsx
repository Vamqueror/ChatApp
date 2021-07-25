import React, { useEffect, useState } from 'react';
import '../App.css';
import ChatLog from '../ChatLog';
import { useLocation, useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal } from 'react-bootstrap';
import GroupList from '../GroupList';
import { GroupProvider } from '../Context/GroupProvider';
import NewGroupModal from '../NewGroup';


const Chat = () => {
    
    const [newGroupModal,setGroupModal]=useState(false)
    const location = useLocation<{ Username: string }>()
    let navigate = useHistory();

    const closeModal=()=>{
        setGroupModal(false)
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

    return <GroupProvider>
        <div>
        <Button  variant="danger" onClick={disconnectClick}>Disconnect</Button>
        <div className="chatApp">
        <GroupList />
        <ChatLog username={location.state?location.state.Username:""}/><br/>
        <Button onClick={()=>setGroupModal(true)}>Create New Group</Button>
        </div>
        <Modal show={newGroupModal} onHide={closeModal}>
        <NewGroupModal closeModal={closeModal}/>
        </Modal>
        </div>
        </GroupProvider>
}


export default Chat
