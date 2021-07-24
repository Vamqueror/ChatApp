import { group } from "console";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { splitMembersString} from "../generalFunctions";
import Group from "../Group";
import Message from "../Message";

const allGroups = [new Group(44, "the boys",[]), new Group(22, "papapos",[]), new Group(55, "sad face",[])]

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
    const [myGroups, setGroups] = useState<Group[]>(allGroups)
    const [currentGroup, setCurrentGroup] = useState<Group | null>(null)

    const addGroup=(name:string,members:string)=>{
        let group=new Group(id++,name,splitMembersString(members))
        console.log(group)
        setGroups(obj=>[...obj,group])
    }
    const handleGroupChange = (id: number) => {
        let objToChange
        if (objToChange = allGroups.find(obj => obj.id == id))
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