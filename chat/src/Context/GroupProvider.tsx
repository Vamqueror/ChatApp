
import { createContext, FC, useContext, useEffect, useState } from "react";
import { splitMembersString} from "../generalFunctions";
import Group from "../Group";
import Message from "../Message";
import { useChatSocket } from "./ChatSocketProvider";

const GroupContext = createContext<Group[]>([])
const CurrentGroupContext = createContext<Group | null>(null)
const CurrentGroupUpdateContext = createContext<Function>(() => { })
const SendMessageContext = createContext<Function>(() => { })
const AddGroupContext = createContext<Function>(() => { })

export function useGroup() {
    return useContext(GroupContext)
}

export function useSendMessage() {
    return useContext(SendMessageContext)
}

export function useCurrentGroup() {
    return useContext(CurrentGroupContext)
}

export function useCurrentGroupUpdate() {
    return useContext(CurrentGroupUpdateContext)
}

export function useAddGroup(){
    return useContext(AddGroupContext)
}

let id=0
export const GroupProvider: FC<{ children: any }> = (props) => {
    const [myGroups, setGroups] = useState<Group[]>([])
    const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
    const socket=useChatSocket()

    const addGroup=(name:string,members:string)=>{
       // let groupTemplate={name,members:splitMembersString(members)}
        if(socket==null) return
        socket.emit('group-add',{name,members:splitMembersString(members)})
       // setGroups(obj=>[...obj,])
    }
    const handleGroupChange = (id: number) => {
        let objToChange
        if (objToChange = myGroups.find(obj => obj.id == id))
            setCurrentGroup(objToChange)
    }

    const updateGroupLog = (msg: Message) => {
        if (currentGroup === null) return
        let arr = [...myGroups]
        let objectToChange
        if (objectToChange = arr.find(obj => obj.id == currentGroup.id))
            objectToChange.msgLog = [...objectToChange.msgLog, msg]
        console.log(objectToChange)
        setGroups(arr)
    }

    useEffect(()=>{
        socket?.on('group-add',(group:any)=>{
            setGroups(arr=>[...arr,group.group])
        })
    },[socket])


    return (
        <GroupContext.Provider value={myGroups}>
            <AddGroupContext.Provider value={addGroup}>
            <CurrentGroupContext.Provider value={currentGroup}>
                <CurrentGroupUpdateContext.Provider value={handleGroupChange}>
                    <SendMessageContext.Provider value={updateGroupLog}>
                        {props.children}
                    </SendMessageContext.Provider>
                </CurrentGroupUpdateContext.Provider>
            </CurrentGroupContext.Provider>
            </AddGroupContext.Provider>
        </GroupContext.Provider>
    )

}