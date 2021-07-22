import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';



function Login() {

    const input = useRef("");
    let navigate=useHistory();

    const handleChange = (event: any) => {
        input.current = event.target.value
    }

    const buttonClick = (e: any) => {
        e.preventDefault();
        navigate.push('/',{Username:input.current})
    }


    return <div className="login">
        <form>
            <input type="text" onChange={handleChange} placeholder="Enter Username"></input> <br /><br />
            <Button onClick={buttonClick}>Login</Button>
        </form>
    </div>
}


export default Login