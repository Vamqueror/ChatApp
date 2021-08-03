import { FC } from "react";
import { Button } from "react-bootstrap";
import { useCurrentGroup, useRemoveUser } from "../Context/GroupProvider";
import { useUsername } from "../Context/UsernameProvider";

interface groupOptionsProps {
  setRemoveUserModal: Function;
  setAddUserModal:Function;
}

const GroupOptions: FC<groupOptionsProps> = (props) => {
  const currentGroup = useCurrentGroup();
  const removeUser = useRemoveUser();
  const username=useUsername()

  if (currentGroup == null) return <> </>;
  else
    return (<>
    <Button className='mt-3' variant="success" onClick={()=>props.setAddUserModal(true)}>Add User To Group</Button>
      {currentGroup.members.length>1 && <Button className='mt-3' onClick={() => props.setRemoveUserModal(true)} variant="warning">
        Remove User From Group
      </Button>}
      <Button className='mt-3' variant="danger" onClick={() => removeUser( username, currentGroup.id)}>
        Leave Group
      </Button>
    </>);
};

export default GroupOptions;
