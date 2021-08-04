import { FC, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useAddGroup } from "../../Context/GroupProvider";
import { useUsername } from "../../Context/UsernameProvider";

interface ModalCloser {
  closeModal: Function;
}
const NewGroupModal: FC<ModalCloser> = (props) => {
  const nameRef = useRef("");
  const membersRef = useRef("");
  const addGroup = useAddGroup();
  const username = useUsername();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      createGroup();
      props.closeModal();
    }
  };
  const handleChangeName = (event: any) => {
    nameRef.current = event.target.value;
  };

  const handleChangeMembers = (event: any) => {
    membersRef.current = event.target.value;
  };
  const createGroup = () => {
    addGroup(nameRef.current, membersRef.current + "," + username, false);
  };

  return (
    <>
      <Modal.Header closeButton>Create Group</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChangeName(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Members (write commas between each member)</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChangeMembers(e)}
            />
          </Form.Group>
          <br />
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewGroupModal;
