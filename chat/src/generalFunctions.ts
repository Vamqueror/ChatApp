export const splitMembersString=(members:string)=>{
    return members.trim().replaceAll(" ","").split(",").filter(word=>word!="")
}