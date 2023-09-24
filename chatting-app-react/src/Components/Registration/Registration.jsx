import React, { useState } from 'react';
import Registration_img from '../../assets/registration.png';
import {BsEyeSlash,BsEye} from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification} from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';

const Registration = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email , setEmail] = useState('')
    const [fullName , setFullName] = useState('')
    const[password, setPassword] = useState('')
    const[passwordShow, setPasswordShow] = useState(false)


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
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailErr('Please input your valid email');
            }
        }
        if(!fullName){
            setFullNameErr('Please input your full name')
        }
        if(!password){
            setPasswordErr('Please input your password')
        }else{
            if (!/^(?=.*[a-z])/.test(password)){
                setPasswordErr('Please give a lowercase alphabet')
            }else if(!/^(?=.*[A-Z])/.test(password)){
                setPasswordErr('Please give a upercase alphabet')
            }else if(!/^(?=.*[0-9])/.test(password)){
                setPasswordErr('Please give a number')
            }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
                setPasswordErr('Please give a symble')
            }else if(!/^(?=.{8,})/.test(password)){
                setPasswordErr('Please give minimum 8 charecter')
            }
        }
        if(email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && fullName && password && /^(?=.*[a-z])/.test(password) && /^(?=.*[A-Z])/.test(password) && /^(?=.*[0-9])/.test(password) && /^(?=.*[!@#$%^&*])/.test(password) && /^(?=.*[!@#$%^&*])/.test(password)){
            createUserWithEmailAndPassword(auth, email, password).then(()=>{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success('Registration Done please verify your Email ');
                    setEmail('')
                    setFullName('')
                    setPassword('')
                    setTimeout(()=>{
                        navigate('/login')
                    },3000)
                });
            }).catch((error) =>{
                setEmailErr('this email already used');
            })
        }
    }


  return (
    <>
    <section className="registration">
    <ToastContainer position="top-center" theme="dark"/>
        <div className="registration_main flex">
            <div className="registration_left w-1/2 flex justify-end pt-[100px] pr-[70px]">
                <div className="inf ">
                    <h1 className="font-nunito font-semibold text-[35px] text-secondary_color">Get started with easily register</h1>
                    <p className="font-nunito font-normal text-[21px] text-[#808080]">Free register and you can enjoy it</p>


                    <div className="mt-[35px] relative">
                        <input onChange={handleEmail} value= {email} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type="email" placeholder="Email"/>
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
                        <input onChange={handleName} value={fullName} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type="text" placeholder="Full name"/>
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
                        <input onChange={handlePassword} value={password} className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type={passwordShow ? 'text' : 'password'} placeholder="Password"/>

                        {
                            passwordShow ? <BsEye onClick={()=> setPasswordShow (!passwordShow)}  className='absolute top-[20px] right-[170px]'/>
                            : <BsEyeSlash onClick={()=> setPasswordShow (!passwordShow)} className='absolute top-[20px] right-[170px]'/>
                        }

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
                    <div onClick={handleSubmit} >
                        <button  className="mt-[30px] text-center w-[70%] py-[15px]  bg-primary_color rounded-[100px] text[20px] font-nunito font-semibold text-white">Sign up</button>
                    </div>
                    <p className="mt-[10px] text-center w-[70%] text-[15px] font-normal font-open text-secondary_color">Already  have an account ? <Link to='/Login' className="font-bold text-[#EA6C00] cursor-pointer">Sign In</Link></p>


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