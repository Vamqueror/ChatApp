import { createContext, FC, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatSocket from "../Services/ChatSocket";

const SocketContext = createContext<ChatSocket | undefined>(undefined);

export function useChatSocket() {
  return useContext(SocketContext);
}

export const ChatSocketProvider: FC<{ username: string; children: any }> = (
  props
) => {
  const [socket, setSocket] = useState<ChatSocket>();

  useEffect(() => {
    if (!props.username || props.username == "") return;
    const username = props.username;
    const clientSocket = new ChatSocket(username);
    setSocket(clientSocket);
    return () => {
      clientSocket.disconnect();
    };
  }, [props.username]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
