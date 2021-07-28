import { Children, createContext, FC, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const SocketContext=createContext<any>(null)

export function useChatSocket(){
    return useContext(SocketContext)
}

export const ChatSocketProvider: FC<{username:string ,children: any }> = (props) => {

    const [socket,setSocket]=useState<Socket>()

    useEffect(()=>{
        if(!props.username||props.username=="") return
        const username=props.username
        const clientSocket=io('http://localhost:4001',{query:{username}})
        setSocket(clientSocket)
        return () => {clientSocket.disconnect()}
    },[props.username])

    

    return <SocketContext.Provider value={socket}>
        {props.children}
    </SocketContext.Provider>
}