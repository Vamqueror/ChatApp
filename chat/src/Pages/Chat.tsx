import {useState } from "react";
import "../App.css";
import ChatLog from "../components/ChatLog";
import { useLocation, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ButtonGroup } from "react-bootstrap";
import GroupList from "../components/GroupList";
import { GroupProvider } from "../Context/GroupProvider";
import NewGroupModal from "../components/NewGroup";
import { ChatSocketProvider } from "../Context/ChatSocketProvider";
import RemoveUserModal from "../components/RemoveUser";
import GroupOptions from "../components/GroupOptions";
import AddUserModal from "../components/AddUser";
import { UsernameProvider } from "../Context/UsernameProvider";

const Chat = () => {
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const location = useLocation<{ Username: string }>();
  let navigate = useHistory();

  if (location.state == undefined || location.state.Username === "") {
    navigate.push("/Login");
    return <div></div>;
  }

  const closeNewGroupModal = () => {
    setNewGroupModal(false);
  };

  const closeRemoveUserModal = () => {
    setRemoveUserModal(false);
  };

  const closeAddUserModal = () => {
    setAddUserModal(false);
  };

  const disconnectClick = (e: any) => {
    e.preventDefault();
    location.state.Username = "";
    navigate.push("/Login");
  };

  return (
    <UsernameProvider username={location.state.Username}>
      <ChatSocketProvider>
        <GroupProvider>
          <div>
            <Button variant="danger" onClick={disconnectClick}>
              Disconnect
            </Button>
            <div className="chatApp">
              <div className="flex-column d-flex">
                <GroupList />
              </div>
              <ChatLog />
              <ButtonGroup vertical style={{ marginLeft: "10px" }}>
                <Button onClick={() => setNewGroupModal(true)}>
                  Create New Group
                </Button>
                <GroupOptions
                  setAddUserModal={setAddUserModal}
                  setRemoveUserModal={setRemoveUserModal}
                />
              </ButtonGroup>
            </div>
          </div>
          <div>
            <Modal show={newGroupModal} onHide={closeNewGroupModal}>
              <NewGroupModal closeModal={closeNewGroupModal} />
            </Modal>
          </div>
          <div>
            <Modal show={addUserModal} onHide={closeAddUserModal}>
              <AddUserModal />
            </Modal>
          </div>
          <div>
            <Modal show={removeUserModal} onHide={closeRemoveUserModal}>
              <RemoveUserModal />
            </Modal>
          </div>
        </GroupProvider>
      </ChatSocketProvider>
    </UsernameProvider>
  );
};

export default Chat;
