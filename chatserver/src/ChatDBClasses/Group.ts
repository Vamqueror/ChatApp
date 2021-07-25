  
import Message from "./Message";

export default class Group{
    id:string
    name:string
    members:string[]
    msgLog:Message[]


    constructor(id:string,name:string,members:string[]){
        this.msgLog=[]
        this.id=id
        this.name=name
        this.members=members
    }
}