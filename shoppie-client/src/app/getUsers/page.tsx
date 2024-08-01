"use client"
import { userService } from "@/src/services/apiUrls"


export default function GetUsers(){

    const handleGetUsers=async()=>{
        try{
        const result = await userService.getUsers()
        console.log(result);
        
        }catch(error){
            console.log(error)
        }
    }
    return(<div>

       <button onClick={handleGetUsers}>Get Users</button>
    </div>)
}