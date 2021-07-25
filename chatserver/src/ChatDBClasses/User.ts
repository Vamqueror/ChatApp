import Group from "./Group";


export default class User{
    username:string
    groups:Group[]

    constructor(username:string){
        this.username=username
        this.groups=[]
    }
}