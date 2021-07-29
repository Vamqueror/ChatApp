import React, { useEffect, useState } from "react";
import "../App.css";
import ChatLog from "../components/ChatLog";
import { useLocation, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import GroupList from "../components/GroupList";
import { GroupProvider } from "../Context/GroupProvider";
import NewGroupModal from "../components/NewGroup";
import { ChatSocketProvider } from "../Context/ChatSocketProvider";

const Chat = () => {
  const [newGroupModal, setNewGroupModal] = useState(false);
  const location = useLocation<{ Username: string }>();
  let navigate = useHistory();

  if (location.state == undefined || location.state.Username === "") {
    navigate.push("/Login");
    return <div></div>;
  }

  const closeModal = () => {
    setNewGroupModal(false);
  };

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
            <GroupList/>
              <ChatLog
                username={location.state ? location.state.Username : ""}
              />
              <br />
            <Button onClick={() => setNewGroupModal(true)}>
              Create New Group
            </Button>
          </div>
          <Modal show={newGroupModal} onHide={closeModal}>
            <NewGroupModal
              username={location.state.Username}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      </GroupProvider>
    </ChatSocketProvider>
  );
};

export default Chat;
