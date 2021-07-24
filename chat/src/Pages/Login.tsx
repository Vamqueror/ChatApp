import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';



function Login() {

    const input = useRef("");
    let navigate=useHistory();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        input.current = event.target.value
    }

    const loginClick = (e: any) => {
        e.preventDefault();
        navigate.push('/',{Username:input.current})
    }


    return <div className="login">
        <form>
            <input type="text" onChange={(e)=>handleChange(e)} placeholder="Enter Username"></input> <br /><br />
            <Button onClick={loginClick}>Login</Button>
        </form>
    </div>
}


export default Login