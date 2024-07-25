import {auth,googleProvider} from '@/src/firebase'

import {signInWithPopup} from 'firebase/auth'
import { userService } from '../services/apiUrls';

import { useRouter } from 'next/navigation';



interface UserData {
    email: string;
    displayName: string;
  }
  
 

const useGoogleSignIn=()=>{

    
    const router=useRouter()
    const handleGoogleData=async(data:UserData)=>{
       
         const email=data.email
         const firstName=data.displayName
     
         const dataToSend={
             email:email,
             firstName:firstName
         }
     
         console.log(dataToSend);
         
         try{
             const res = await userService.googleSignIn(dataToSend)
            if(res.status==200){
                         
              const tokens = JSON.stringify(res.data);
      
              localStorage.setItem('token', tokens);
             router.push('/')
            }
             
         }catch(error){
             console.log(error);
         }
     }

     const googleData = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          if (result) {
            handleGoogleData(result.user as UserData);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      return { googleData };
    };
    
    export default useGoogleSignIn;
   
       