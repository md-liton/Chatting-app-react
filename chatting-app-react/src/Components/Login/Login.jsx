import React, { useState } from 'react'
import {BsEyeSlash,BsEye} from 'react-icons/bs'
import login from '../../assets/login.jpg'
import google from '../../assets/google.svg'

const Login = () => {
    const [email,setEmail]=useState('')
    const [emailErr,setEmailErr]=useState('')


    const [password,setPassword]=useState('')
    const [passwordErr,setPasswordErr]=useState('')
    const [passwordShow,setPasswordShow]=useState(false)


    const handleEmail =(e)=>{
        setEmail(e.target.value);
        setEmailErr('')
    }

    const handlePassword =(e)=>{
        setPassword(e.target.value);
        setPasswordErr('');
    }



    const handleLogin =()=>{
        if(!email){
            setEmailErr('please give your Email');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailErr('please input your valid email')
            }
        }
        if(!password){
            setPasswordErr('please give your password');
        }else{
            if(!/^(?=.*[a-z])/.test(password)){
                setPasswordErr('please use small latter')
            }else if(!/^(?=.*[A-Z])/.test(password)){
                setPasswordErr('please use capital latter')
            }else if(!/^(?=.*[0-9])/.test(password)){
                setPasswordErr('please use number')
            }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
                setPasswordErr('please symble')
            }else if(!/^(?=.{8,})/.test(password)){
                setPasswordErr('minimum 8 charecter')
            }
        }

    }


  return (
    <>
    <section className="registration">
        <div className="registration_main flex">
            <div className="registration_left w-1/2 flex justify-end pt-[100px] pr-[70px]">
                <div className="inf ">
                    <h1 className="font-nunito font-bold text-[35px] text-secondary_color">Login to your account!</h1>
                    <div className='w-[70%] flex gap-[10px] text-[14px] font-bold font-open text-secondary_color border border-[#B3B3C9] mt-[30px] py-[20px] pl-[30px] pr-[40px] rounded-[10px] cursor-pointer'>
                        <img src={google} alt="img" />
                        <p>Login with Google</p>
                    </div>

                    <div className="mt-[35px] relative">
                        <p className=" bg-white ] text-[16px] font-bold font-nunito text-[#585D8E]">Email Address</p>
                        <input onChange={handleEmail}  className=" w-full py-[10px] border-b border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type="email" placeholder="Email"/>
                        <p className='absolute left-0 bottom-[-27px] text-[16px] font-bold font-nunito text-red-500'>{emailErr}</p>
                    </div>
                    <div className="mt-[35px] relative">
                        <p className=" bg-white ] text-[16px] font-bold font-nunito text-[#585D8E]">Email Address</p>
                        <input onChange={handlePassword} className=" w-full py-[10px] border-b border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type={passwordShow ? 'text' : 'password'} placeholder="Password"/>
                        <p className='absolute left-0 bottom-[-27px] text-[16px] font-bold font-nunito text-red-500'>{passwordErr}</p>
                        {
                            !passwordShow ? <BsEyeSlash onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[40px] right-[20px]' />
                            : <BsEye onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[40px] right-[20px]'/>
                        }
                        
                        
                    </div>
                    <div onClick={handleLogin}>
                        <button  className="mt-[30px] text-center w-full py-[15px]  bg-primary_color rounded-[10px] text[20px] font-nunito font-semibold text-white">Login to Continue</button>
                    </div>
                    <p className="mt-[10px] text-[15px] font-normal font-open text-secondary_color">Don’t have an account ? <span className="font-bold text-[#EA6C00] cursor-pointer">Sign In</span></p> 


                </div>
            </div>
            <div className="registration_right w-1/2">
                <img className="w-full h-screen object-cover" src={login} alt="img"/>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login