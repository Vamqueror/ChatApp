import { useEffect, useRef, useState } from "react";
import { Modal, Form, Button,Alert } from "react-bootstrap";
import { useChatSocket } from "../Context/ChatSocketProvider";
import { useAddUser, useCurrentGroup } from "../Context/GroupProvider";

const AddUserModal = () => {
  const currentGroup = useCurrentGroup();
  const usernameRef = useRef("");
  const [error, setError] = useState("");
  const addUser = useAddUser();
  const socket = useChatSocket();

  const handleChangeName = (event: any) => {
    usernameRef.current = event.target.value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    if (form.checkValidity() === true)
      addUser(usernameRef.current, currentGroup?.id);
  };

  const isError = () => {
    if (error !== "") return true;
    return false;
  };

  const ErrorAlert = () => {
    return (
      <Alert variant="danger" show={isError()}>
        {error}
      </Alert>
    );
  };

  useEffect(() => {
    socket?.addInvalidUserSocketEvent(setError);
    return () => socket?.off("invalid-user");
  }, [socket]);

  return (
    <>
      <Modal.Header closeButton>Add User</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Enter User To Add</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChangeName(e)}
              required
            />
          </Form.Group>
          <br />
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Body>
      <ErrorAlert />
    </>
  );
};

export default AddUserModal;
