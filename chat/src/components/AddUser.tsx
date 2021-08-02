import { useRef } from "react";
import { Modal, Form,Button } from "react-bootstrap";

const AddUserModal = () => {
  const usernameRef = useRef("");

  const handleChangeName = (event: any) => {
    usernameRef.current = event.target.value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form=e.currentTarget;
    if(form.checkValidity()===true) {;}
    //createGroup()  
  }

  return (
    <>
      <Modal.Header closeButton>Add User</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Enter User To Add</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChangeName(e)}
              required
            />
          </Form.Group>
          <br/>
          <Button type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddUserModal;
