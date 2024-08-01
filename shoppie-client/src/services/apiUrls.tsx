import { axiosPrivate } from "./interceptor";

console.log(process.env.NEXT_PUBLIC_API_URL);


const login = (data:any)=>{
    return axiosPrivate.post<any>('users/login',data)
}

const register = (data:any)=>{
    return axiosPrivate.post<any>('users/register', data)
}

const getUsers = ()=>{
    return axiosPrivate.get<any>('users/get')
}

const googleSignIn = (data:any)=>{
    return axiosPrivate.post<any>('users/google',data)

}

const emailVerify = (id:string)=>{

    console.log("id in api ",id);
    
    return axiosPrivate.post<any>(`users/verify/${id}`)
}



const userService={
    login,getUsers,register,googleSignIn,emailVerify
}




export {userService}