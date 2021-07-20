import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import MessageBox from './MessageBox';
import Message from './Message';
import { io } from "socket.io-client";
import { FC } from "react";
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import Group from './Group';


interface myConvers {
    groups: Group[]
    setCurrentGroup: any
}

const Conversations: FC<myConvers> = (props) => {

    const renderGroups = (): JSX.Element[] => {
        return props.groups.map((element,index) => {
            return <ListGroupItem key={index} eventKey={element.id}>{element.name}</ListGroupItem>
        })
    }

    return <ListGroup onSelect={(selectedKey) =>props.setCurrentGroup(selectedKey)}>
        {renderGroups()}
    </ListGroup>
}

export default Conversations