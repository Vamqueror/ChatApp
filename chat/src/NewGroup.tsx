import { ChangeEvent, FC, useRef } from 'react';
import { Modal, Form,Button} from 'react-bootstrap';
import { useAddGroup } from './Context/GroupProvider';

interface ModalCloser{
  closeModal:any
}
const NewGroup:FC<ModalCloser>=(props)=>{

    const nameRef=useRef("");
    const membersRef=useRef("");
    const addGroup=useAddGroup()

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        props.closeModal()
    }
    const handleChangeName = (event: any) => {
      nameRef.current = event.target.value
  }

  const handleChangeMembers = (event: any) => {
    membersRef.current = event.target.value
}
     const createGroupBtn=(e:any)=>{
      e.preventDefault()
      addGroup(nameRef.current,membersRef.current)
    } 

    return  <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={e=>handleChangeName(e)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Members (write commas between each member)</Form.Label>
            <Form.Control type="text" onChange={e=>handleChangeMembers(e)} required />
          </Form.Group>
          <br/>
          <Button type="submit"  onClick={e=>createGroupBtn(e)} >Create</Button>
        </Form>
      </Modal.Body>
    </>
}


export default NewGroup