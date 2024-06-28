import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail]=useState()

  const handleForgot =()=>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setEmail('')
      toast.success('please check your email and reset your password ');
    })
    .catch((error) => {
      const errorCode = error.code;
      toast.error('input your valid email or try again');
    // ..
    });
  }


  return (
    <>
    <section className='h-screen flex justify-center items-center bg-[#6499E9]'>
    <ToastContainer position="top-center" theme="dark"/>
        <div className='bg-[#A6F6FF] h-[250px] w-[400px] p-[50px] rounded-[10px]'>
            <h2 className='text-primary_color font-bold font-nunito text-[25px]'>Forgot Password</h2>
            <p className='text-primary_color font-bold font-nunito text-[15px]'>Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} className='mb-[15px] bg-transparent border-b-[1px] border-black w-full py-[10px] focus:outline-none' type="email " placeholder='Enter Your Email' />
            <div className='flex gap-[25px]'>
                <Link onClick={handleForgot} className='py-[10px] px-[25px] bg-primary_color rounded-[10px] text-white'>Reset</Link>
                <Link to='/login'  className='py-[10px] px-[25px] bg-primary_color rounded-[10px] text-white'>Back to Login</Link>
            </div>
        </div>
    </section>
    </>
  )
}

export default ForgotPassword