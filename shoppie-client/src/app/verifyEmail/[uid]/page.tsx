
"use client"
import { useParams } from "next/navigation"
export default function Verify(){
    
    const {uid} = useParams()

    return(<div>Id is {uid}</div>)
}