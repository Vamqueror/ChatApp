import "../App.css";
import { ListGroup, ListGroupItem,OverlayTrigger,Popover } from "react-bootstrap";
import { useGroup, useCurrentGroupUpdate } from "../Context/GroupProvider";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const GroupList = () => {
  const groups = useGroup();
  const setCurrentGroup = useCurrentGroupUpdate();

  const renderGroups = (): JSX.Element[] => {
    return groups.map((element, index) => {
      return (
        <OverlayTrigger
      trigger="hover"
      placement="left"
      overlay={
        <Popover id={element.id}>
          <Popover.Title as="h3">{`Group Members`}</Popover.Title>
          <Popover.Content>
            {element.members.map((member)=>`${member}\n`)}
          </Popover.Content>
        </Popover>
      }
    ><ListGroupItem action variant="danger" key={index} eventKey={element.id}>
          {element.name}
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
