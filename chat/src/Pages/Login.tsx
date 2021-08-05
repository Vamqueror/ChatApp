import {useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import { Button, Form } from "react-bootstrap";

function Login() {
  const input = useRef("");
  const [validationMessage, setValidationMessage] = useState("");
  let navigate = useHistory();

  const handleChange = (event: any) => {
    input.current = event.target.value;
  };

  const loginClick = (e: any) => {
    e.preventDefault();
    if (input.current.includes("-") || input.current.includes(","))
      setValidationMessage("Unallowed special characters detected");
    else navigate.push("/", { Username: input.current });
  };

  return (
    <>
      <div className="login">
        <Form onSubmit={(e) => loginClick(e)}>
          <Form.Control
            maxLength={18}
            style={{ fontSize: "32px" }}
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Username"
          ></Form.Control>
          <br />
          <Button style={{ fontSize: "25px" }} type="submit">
            Login
          </Button>
          <p className="errorLbl validation">{validationMessage}</p>
        </Form>
      </div>
    </>
  );
}

export default Login;
