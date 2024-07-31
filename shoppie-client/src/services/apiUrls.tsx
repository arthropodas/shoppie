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

const userService={
    login,getUsers,register,googleSignIn
}

const vendorRegister = (data:any)=>{
    return axiosPrivate.post<any>('vendors/register', data)
}

const verifyEmail = async (data:any) => {
    console.log("data>>>>>>>>", data,"\n","token>>>>>>>>>>>>>>>",)

  try{

      return axiosPrivate.post(
          '/vendors/verifyEmail', 
          data, 
       
        );
  }
  catch(e){
    console.log("error is", e)
  }
  };





const vendorService={
    vendorRegister,verifyEmail
}

export {userService,vendorService,}