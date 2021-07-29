import '../App.css';
import {  ListGroup, ListGroupItem } from 'react-bootstrap';
import {useGroup,useCurrentGroupUpdate} from '../Context/GroupProvider'
import { useEffect } from 'react';

const GroupList = () => {

    const groups=useGroup()
    const setCurrentGroup=useCurrentGroupUpdate()
    
    const renderGroups = (): JSX.Element[] => {
        return groups.map((element,index) => {
            return <ListGroupItem action key={index} eventKey={element.id}>{element.name}</ListGroupItem>
        })
    }

    useEffect(()=>{
        console.log(groups)
    })
    
    return <ListGroup className="grouplist" onSelect={(selectedKey) =>setCurrentGroup(selectedKey)}>
        {renderGroups()}
    </ListGroup>
}

export default GroupList