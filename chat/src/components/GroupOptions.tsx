import { FC } from "react";
import { Button } from "react-bootstrap";
import { useCurrentGroup, useRemoveUser } from "../Context/GroupProvider";

interface groupOptionsProps {
  setRemoveUserModal: Function;
  setAddUserModal:Function;
  username: string;
}

const GroupOptions: FC<groupOptionsProps> = (props) => {
  const currentGroup = useCurrentGroup();
  const removeUser = useRemoveUser();

  if (currentGroup == null) return <> </>;
  else
    return (<>
    <Button className='mt-3' variant="success" onClick={()=>props.setAddUserModal(true)}>Add User To Group</Button>
      {currentGroup.members.length>1 && <Button className='mt-3' onClick={() => props.setRemoveUserModal(true)} variant="warning">
        Remove User From Group
      </Button>}
      <Button className='mt-3' variant="danger" onClick={() => removeUser(props.username, currentGroup.id)}>
        Leave Group
      </Button>
    </>);
};

export default GroupOptions;
