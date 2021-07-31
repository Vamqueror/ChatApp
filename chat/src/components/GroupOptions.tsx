import { FC } from "react";
import { Button } from "react-bootstrap";
import { useCurrentGroup, useRemoveUser } from "../Context/GroupProvider";

interface groupOptionsProps {
  setRemoveUserModal: Function;
  username: string;
}

const GroupOptions: FC<groupOptionsProps> = (props) => {
  const currentGroup = useCurrentGroup();
  const removeUser = useRemoveUser();

  if (currentGroup == null) return <> </>;
  else
    return (<>
      {currentGroup.members.length>1 && <Button className='mt-3' onClick={() => props.setRemoveUserModal(true)} variant="warning">
        Remove User From Group
      </Button>}
      <Button className='mt-3' variant="danger" onClick={() => removeUser(props.username, currentGroup.id)}>
        Leave Group
      </Button>
    </>);
};

export default GroupOptions;
