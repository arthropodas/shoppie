import { axiosPrivate } from "./interceptor";

console.log(process.env.NEXT_PUBLIC_API_URL);


const login = (data:any)=>{
    return axiosPrivate.post<any>('users/login',data)
}

const getUsers = ()=>{
    return axiosPrivate.get<any>('users/get')
}

const userService={
    login,getUsers
}

export {userService}