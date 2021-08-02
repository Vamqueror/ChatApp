import Group from "./ChatDBClasses/Group";
import User from "./ChatDBClasses/User";

export const checkIfUserExists=(name:string,userArr:User[])=>{
    let found = false;
    for(var i = 0; i < userArr.length; i++) {
        if (userArr[i].username == name) {
            found = true;
            break;
        }
    }
    return found
}

/* export const addGroupToUsers=(members:User[],group:Group)=>{
    members.forEach(member=>{
        member.groups.push(group)
    })
} */

