import { useState } from "react";

export default function useInput(initialVal:string){
    const [input,setInput]=useState(initialVal);
    return [input,setInput];
}