import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';


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


    return <div>
        <form>
            <input type="text" onChange={handleChange} placeholder="Enter Username"></input><br />
            <button onClick={buttonClick}>Login</button>
        </form>
    </div>
}


export default Login