import { FC, useRef } from 'react';
import { Modal, Form,Button} from 'react-bootstrap';

interface ModalCloser{
  closeModal:any
}
const NewGroup:FC<ModalCloser>=(props)=>{

    const nameRef=useRef<any>();
    const membersRef=useRef<any>();

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        props.closeModal()
    }

    return  <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={membersRef} required />
          </Form.Group>
          <br/>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
}


export default NewGroup