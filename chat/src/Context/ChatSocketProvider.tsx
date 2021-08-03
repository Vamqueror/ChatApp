import { createContext, FC, useContext, useEffect, useState } from "react";
import ChatSocket from "../Services/ChatSocket";
import { useUsername } from "./UsernameProvider";

const SocketContext = createContext<ChatSocket | undefined>(undefined);

export function useChatSocket() {
  return useContext(SocketContext);
}
export const ChatSocketProvider: FC<{ children: any }> = (
  props
) => {
  const [socket, setSocket] = useState<ChatSocket>();
  const username = useUsername();

  useEffect(() => {
    if (!username || username == "") return;
    const clientSocket = new ChatSocket(username);
    setSocket(clientSocket);
    return () => {
      clientSocket.disconnect();
    };
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
