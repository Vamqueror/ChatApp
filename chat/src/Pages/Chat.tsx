import React, { useEffect, useState } from "react";
import "../App.css";
import ChatLog from "../components/ChatLog";
import { useLocation, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal ,ButtonGroup} from "react-bootstrap";
import GroupList from "../components/GroupList";
import { GroupProvider } from "../Context/GroupProvider";
import NewGroupModal from "../components/NewGroup";
import { ChatSocketProvider } from "../Context/ChatSocketProvider";
import RemoveUserModal from "../components/RemoveUser";
import GroupOptions from "../components/GroupOptions";

//test
const Chat = () => {
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [removeUserModal,setRemoveUserModal]=useState(false);
  const location = useLocation<{ Username: string }>();
  let navigate = useHistory();

  if (location.state == undefined || location.state.Username === "") {
    navigate.push("/Login");
    return <div></div>;
  }

  const closeNewGroupModal = () => {
    setNewGroupModal(false);
  };

  const closeRemoveUserModal=()=>{
    setRemoveUserModal(false);
  }

  const disconnectClick = (e: any) => {
    e.preventDefault();
    location.state.Username = "";
    navigate.push("/Login");
  };

  return (
    <ChatSocketProvider username={location.state.Username}>
      <GroupProvider username={location.state.Username}>
        <div>
          <Button variant="danger" onClick={disconnectClick}>
            Disconnect
          </Button>
          <div className="chatApp">
            <div className="flex-column d-flex">
            <GroupList />
            </div>
            <ChatLog username={location.state ? location.state.Username : ""} />
            <ButtonGroup vertical style={{marginLeft:"10px"}}>
            <Button onClick={() => setNewGroupModal(true)}>
              Create New Group
            </Button>
            <GroupOptions username={location.state.Username} setRemoveUserModal={setRemoveUserModal}/>
            </ButtonGroup>
          </div>
          <Modal show={newGroupModal} onHide={closeNewGroupModal}>
            <NewGroupModal
              username={location.state.Username}
              closeModal={closeNewGroupModal}
            />
          </Modal>
        </div>
        
        <div>
          <Modal show={removeUserModal} onHide={closeRemoveUserModal}>
            <RemoveUserModal username={location.state.Username}/>
          </Modal>
        </div>
      </GroupProvider>
    </ChatSocketProvider>
  );
};

export default Chat;
