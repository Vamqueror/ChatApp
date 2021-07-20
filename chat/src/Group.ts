  
import Message from "./Message";

export default class Group{
    id:number
    name:string
    msgLog:Message[]


    constructor(id:number,name:string){
        this.msgLog=[]
        this.id=id
        this.name=name
    }
}