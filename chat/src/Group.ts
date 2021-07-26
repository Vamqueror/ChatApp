  
import Message from "./Message";

export default class Group{
    id:number
    name:string
    members:string[]
    msgLog:Message[]


    constructor(id:number,name:string,members:string[]){
        this.id=id
        this.name=name
        this.members=members
        this.msgLog=[]
    }
}