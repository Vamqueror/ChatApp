import { Modal, Button, ButtonGroup, CloseButton } from "react-bootstrap";
import {
  useCurrentGroup,
  useGroup,
  useRemoveUser,
} from "../Context/GroupProvider";
import { findGroupById } from "../utils/groupFuncitons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUsername } from "../Context/UsernameProvider";

const RemoveUserModal = () => {
  const groups = useGroup();
  const currentGroup = useCurrentGroup();
  const removeUser = useRemoveUser();
  const username = useUsername();

  const memberButtons = (members: string[]) => {
    return members.map((member, index) => {
      return (
        <Button
          className="mt-2"
          onClick={() => removeUser(member, currentGroup?.id)}
          key={index}
          variant="danger"
        >
          Remove: {member}
        </Button>
      );
    });
  };

  const mappedMembersComponent = () => {
    let members;
    if (!currentGroup) return;
    members = findGroupById(groups, currentGroup.id)?.members.filter(
      (m) => m !== username
    );
    if (members) return memberButtons(members);
    return;
  };

  return (
    <>
      <Modal.Header closeButton>Remove User</Modal.Header>
      <Modal.Body>
        <ButtonGroup vertical>{mappedMembersComponent()}</ButtonGroup>
      </Modal.Body>
    </>
  );
};

export default RemoveUserModal;
