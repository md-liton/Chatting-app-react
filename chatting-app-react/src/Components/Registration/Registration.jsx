import React, { useState } from 'react'
import Registration_img from '../images/registration.png'

const Registration = () => {

    const [email , setEmail] = useState('')
    const [fullName , setFullName] = useState('')
    const[password, setPassword] = useState('')


    const [emailErr , setEmailErr] = useState('')
    const [fullNameErr , setFullNameErr] = useState('')
    const[passwordErr, setPasswordErr] = useState('')

    const handleEmail = (e)=>{
        setEmail(e.target.value);
        setEmailErr('')
    }
    const handleName = (e)=>{
        setFullName(e.target.value);
        setFullNameErr('')
    }
    const handlePassword =(e)=>{
        setPassword(e.target.value);
        setPasswordErr('')
    }

    const handleSubmit = ()=>{
        if(!email){
            setEmailErr('Please input your email');
        }
        if(!fullName){
            setFullNameErr('Please input your full name')
        }
        if(!password){
            setPasswordErr('Please input your password')
        }
    }


  return (
    <>
    <section className="registration">
        <div className="registration_main flex">
            <div className="registration_left w-1/2 flex justify-end pt-[100px] pr-[70px]">
                <div className="inf ">
                    <h1 className="font-nunito font-semibold text-[35px] text-secondary_color">Get started with easily register</h1>
                    <p className="font-nunito font-normal text-[21px] text-[#808080]">Free register and you can enjoy it</p>


                    <div className="mt-[35px] relative">
                        <input onChange={handleEmail} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color" type="email" placeholder="Email"/>
                        <p className="absolute top-[-11px] left-[25px] bg-white px-[10px] text-[16px] font-bold font-nunito text-[#585D8E]">Email Address</p>
                        <div className='absolute w-full top-[80%]'>
                        {
                            emailErr &&
                            <div className='w-[70%] bg-red-500 py-[5px] px-[30px] rounded-[5px] relative mt-[5px] z-[1]'>
                            <div className='h-[15px] w-[15px] bg-red-500 rotate-45 top-[-7px] left-[30px] absolute z-[-1]'> 
                            </div>
                            <p className='text-[17px] text-white z-[1]'>{emailErr}</p>
                            </div>
                        }
                        </div>
                    </div>
                    <div className="mt-[35px] relative">
                        <input onChange={handleName} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color" type="text" placeholder="Full name"/>
                        <p className="absolute top-[-11px] left-[25px] bg-white px-[10px] text-[16px] font-bold font-nunito text-[#585D8E]">Full name</p>
                       <div className='absolute w-full top-[80%]'>
                       {
                            fullNameErr &&
                            <div className='w-[70%] bg-red-500 py-[5px] px-[30px] rounded-[5px] relative mt-[5px] z-[1]'>
                            <div className='h-[15px] w-[15px] bg-red-500 rotate-45 top-[-7px] left-[30px] absolute z-[-1]'> 
                            </div>
                            <p className='text-[17px] text-white z-[1]'>{fullNameErr}</p>
                            </div>
                        }
                       </div>
                    </div>
                    <div className="mt-[35px] relative">
                        <input onChange={handlePassword} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color" type="password" placeholder="Password"/>
                        <p className="absolute top-[-11px] left-[25px] bg-white px-[10px] text-[16px] font-bold font-nunito text-[#585D8E]">Password</p>
                        <div className='absolute w-full top-[80%]'>
                        {
                            passwordErr &&
                            <div className='w-[70%] bg-red-500 py-[5px] px-[30px] rounded-[5px] relative mt-[5px] z-[1]'>
                            <div className='h-[15px] w-[15px] bg-red-500 rotate-45 top-[-7px] left-[30px] absolute z-[-1]'> 
                            </div>
                            <p className='text-[17px] text-white z-[1]'>{passwordErr}</p>
                            </div>
                        }
                        </div>
                    </div>
                    <div onClick={handleSubmit} className=" mt-[30px] text-center w-[70%] py-[15px]  bg-primary_color rounded-[100px] cursor-pointer">
                        <button  className="w-full h-full text[20px] font-nunito font-semibold text-white">Sign up</button>
                    </div>
                    <p className="mt-[10px] text-center w-[70%] text-[15px] font-normal font-open text-secondary_color">Already  have an account ? <span className="font-bold text-[#EA6C00]">Sign In</span></p>


                </div>
            </div>
            <div className="registration_right w-1/2">
                <img className="w-full h-screen object-cover" src={Registration_img} alt="img"/>
            </div>
        </div>
    </section>
    </>
  )
}


export default Registration