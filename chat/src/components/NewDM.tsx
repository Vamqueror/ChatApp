import { FC, useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useChatSocket } from "../Context/ChatSocketProvider";
import { useAddGroup } from "../Context/GroupProvider";
import { useUsername } from "../Context/UsernameProvider";

interface ModalCloser {
  closeModal: Function;
}
const NewDMModal: FC<ModalCloser> = (props) => {
  const membersRef = useRef("");
  const addGroup = useAddGroup();
  const username = useUsername();
  const [error,setError]=useState("")
  const socket=useChatSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      createGroup();
    }
  };

  const handleChangeMembers = (event: any) => {
    membersRef.current = event.target.value;
  };
  const createGroup = () => {
    addGroup(`${username}-${membersRef.current}`, membersRef.current + "," + username,true);
  };

  useEffect(()=>{
    socket?. addInvalidDMSocketEvent(setError);
    return ()=>socket?.off('invalid-user')
  },[socket])

  return (
    <>
      <Modal.Header closeButton>Create DM</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Member name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChangeMembers(e)}
              required
            />
          </Form.Group>
          <br />
          <Button type="submit">Create</Button>
          <Form.Label>{error}</Form.Label>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewDMModal;
