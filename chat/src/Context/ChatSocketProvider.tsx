import { createContext, FC, useContext, useEffect, useState } from "react";
import ChatSocket from "../Services/ChatSocket";
import { useUsername } from "./UsernameProvider";

const SocketContext = createContext<ChatSocket | undefined>(undefined);

export function useChatSocket() {
  return useContext(SocketContext);
}
export const ChatSocketProvider: FC<{
  errorSetter: React.Dispatch<React.SetStateAction<string>>;
  children: any;
}> = (props) => { 
  const [socket, setSocket] = useState<ChatSocket>();
  const username = useUsername();

  useEffect(() => {
    if (!username || username === "") return;
    const clientSocket = new ChatSocket(username);
    setSocket(clientSocket);
    return () => {
      clientSocket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    socket?.addConnectionErrorSocketEvent(props.errorSetter);
    return () => socket?.off("connect_error");
  });

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
