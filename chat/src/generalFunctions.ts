export const splitMembersString=(members:string)=>{
    console.log(typeof(members))
    return members.trim().replaceAll(" ","").split(",").filter(word=>word!="")
}