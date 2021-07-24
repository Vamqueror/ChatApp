import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MessageBox from './MessageBox';
import Message from './Message';
import { io } from "socket.io-client";
import { FC } from "react";
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import Group from './Group';
import {useGroup,useCurrentGroupUpdate} from './Context/GroupProvider'

const GroupList = () => {

    const groups=useGroup()
    const setCurrentGroup=useCurrentGroupUpdate()
    const renderGroups = (): JSX.Element[] => {
        return groups.map((element,index) => {
            return <ListGroupItem action key={index} eventKey={element.id}>{element.name}</ListGroupItem>
        })
    }

    return <ListGroup onSelect={(selectedKey) =>setCurrentGroup(selectedKey)}>
        {renderGroups()}
    </ListGroup>
}

export default GroupList