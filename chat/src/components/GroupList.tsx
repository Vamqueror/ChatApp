import "../App.css";
import { ListGroup, ListGroupItem,OverlayTrigger,Popover } from "react-bootstrap";
import { useGroup, useCurrentGroupUpdate } from "../Context/GroupProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUsername } from "../Context/UsernameProvider";
import { groupName } from "../utils/groupListFunctions";

const GroupList = () => {
  const groups = useGroup();
  const setCurrentGroup = useCurrentGroupUpdate();
  const username=useUsername();

  const renderGroups = (): JSX.Element[] => {
    return groups.map((element, index) => {
      return (
        <OverlayTrigger
      trigger="hover"
      placement="left"
      overlay={
        <Popover id={element.id}>
          <Popover.Header as="h3">{`Group Members`}</Popover.Header>
          <Popover.Body>
            {element.members.map((member)=>`${member}\n`)}
          </Popover.Body>
        </Popover>
      }
    ><ListGroupItem action variant="secondary" key={index} eventKey={element.id}>
          {groupName(element,username)}
        </ListGroupItem>
    </OverlayTrigger>
      );
    });
  };

  return (
    <ListGroup
      className="grouplist"
      onSelect={(selectedKey) => setCurrentGroup(selectedKey)}
    >
      {renderGroups()}
    </ListGroup>
  );
};

export default GroupList;
