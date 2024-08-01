"use client"
import React from 'react'
import styles from './Register.module.css'
import GoogleButton from 'react-google-button'
import useGoogleSignIn from '../GoogleSignIn'
import { userService } from '@/src/services/apiUrls'
// import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import Link from 'next/link'
// import { useShoppieStore } from '@/src/store/shoppieStore'



interface RegisterData{
    firstName:string,
    lastName:string,
    email:string,
    dob:string,
    gender:number,
    password:string
}


const Schema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dob: Yup.string().required('Date of Birth is required'),
    gender: Yup.number().required('Gender is required'),
    password: Yup.string().required('Password is required').min(6,'ejejgj')
  });
const Register:React.FC=()=>{

    // const router = useRouter()

    // const {setCustId} = useShoppieStore()

    const {googleData} = useGoogleSignIn()

    const {register,handleSubmit,reset,formState:{errors,isValid}}=useForm({
        resolver:yupResolver(Schema),mode:'onChange'
    })

  

  

    const handleRegistartion =async(data:RegisterData)=>{
        
        try{
            const res= await userService.register(data)
            console.log(res);
            if(res.status===200){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                  });

                //  setCustId(res.data.customerId)

                //  localStorage.setItem('cust_id',res.data.customerId)

                //   router.push('/login')
            }
            
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
              });
        }finally{
            reset()
        }
    }
    return(<div className={styles.container}>
        
        <div className={styles.item}>
            <div className={styles.left}>
<img src='https://img.freepik.com/free-vector/business-analytics-report-data-statistics-visualization-financial-analysis-presentation-analyst-female-flat-character-holding-tablet-device_335657-2614.jpg' alt='register'/>
            </div>
            <div className={styles.right}>
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit(handleRegistartion)}>
                    <div className={styles.inputGroup}>
                    <input type="text" placeholder='firstname' {...register('firstName')}/>

                    {errors.firstName&& <span className={styles.errors} >{errors.firstName?.message}</span>}
                   </div>

                   <div className={styles.inputGroup}> 
                    <input type="test" placeholder='lastname'  {...register('lastName')}/>
                   {errors.lastName && <span className={styles.errors}>{errors.lastName?.message}</span>}
                   </div>
                   <div className={styles.inputGroup}>
                    <input type="text" placeholder='email' {...register('email')}/>
                   {errors.email && <span className={styles.errors}>{errors.email?.message}</span>} 
                   </div>
                   <div className={styles.inputGroup}>
                    <input type="date" placeholder='Dob'{...register('dob')} />
                  {errors.dob &&  <span className={styles.errors }>{errors.dob?.message}</span>}
                  </div>
                  <div className={styles.inputGroup}>
                    <div className={styles.gender}>
                    <input type="radio" value={1} {...register('gender')}/> Male
                    <input type='radio'  value={0} {...register('gender')}/> Female
                    </div>
                    {errors.gender && <span className={styles.errors}>{errors.gender?.message}</span>}
                   
                   
                    </div>
                    <div className={styles.inputGroup}>
                   
                    <input type="password" placeholder='password'  {...register('password')}/>
                    {errors.password && <span className={styles.errors}>{errors.password?.message}</span>}
                    </div>
                    <button disabled={!isValid}>Sign Up</button>
                </form>
                <GoogleButton style={{
                    width:'27vh',
                    marginTop:'15px'
                    
                    
                }}
                onClick={googleData}
                />
                <p style={{marginTop:'10px',fontSize:'13px'}}>Already have an account ? <Link href='/login'><span style={{color:'blue'}}>Login</span></Link></p>
            </div>
          
        </div>
    </div>)
}

export default Register