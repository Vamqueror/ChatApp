//TODO: List of users, remove user from group on select
import { FC } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import { useCurrentGroup, useGroup } from "../Context/GroupProvider";
import { findGroupById } from "../utils/groupFuncitons";
import "bootstrap/dist/css/bootstrap.min.css";

interface propTypes {
  username: string;
}

const RemoveUserModal: FC<propTypes> = (props) => {
  const groups = useGroup();
  const currentGroup = useCurrentGroup();

  const memberButtons = (members: string[]) => {
    return members.map((member, index) => {
      return (
        <Button className='mt-2' onClick={(e) => {}} key={index} variant="danger">
          Remove: {member}
        </Button>
      );
    });
  };

  const mappedMembersComponent = () => {
    let members;
    if (!currentGroup) return;
    members = findGroupById(groups, currentGroup.id)?.members.filter(
      (m) => m !== props.username
    );
    if (members) return memberButtons(members);
    return;
  };
  //const setGroups=use
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
