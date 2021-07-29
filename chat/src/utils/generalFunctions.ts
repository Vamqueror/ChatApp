
export const splitMembersString = (members: string) => {
    return members.trim().replaceAll(" ", "").split(",").filter(word => word != "")
}
export const removeDuplicates = (members: string[]) => {
    return members.filter((val, index, self) =>
        index === self.findIndex((o) => (o === val))
    )
}
