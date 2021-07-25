import './App.css';
import {  ListGroup, ListGroupItem } from 'react-bootstrap';
import {useGroup,useCurrentGroupUpdate} from './Context/GroupProvider'

const GroupList = () => {

    const groups=useGroup()
    const setCurrentGroup=useCurrentGroupUpdate()
    
    const renderGroups = (): JSX.Element[] => {
        return groups.map((element,index) => {
            return <ListGroupItem action key={index} eventKey={element.id}>{element.name}</ListGroupItem>
        })
    }

    return <ListGroup onSelect={(selectedKey) =>setCurrentGroup(selectedKey)}>
        {renderGroups()}
    </ListGroup>
}

export default GroupList