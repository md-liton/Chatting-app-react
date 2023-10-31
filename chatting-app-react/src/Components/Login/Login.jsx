import React, { useState } from 'react';
import {BsEyeSlash,BsEye} from 'react-icons/bs';
import login from '../../assets/login.jpg';
import google from '../../assets/google.svg';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLogin } from '../../Slices/UserSlice';
import { ColorRing } from  'react-loader-spinner';

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();


    const [email,setEmail]=useState('')
    const [emailErr,setEmailErr]=useState('')


    const [password,setPassword]=useState('')
    const [passwordErr,setPasswordErr]=useState('')
    const [passwordShow,setPasswordShow]=useState(false)
    const [loading,setLoading] = useState(false)


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
        }
        if(email && password){
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(userLogin(user.user))
                localStorage.setItem('stringify',JSON.stringify(userLogin(user)))
                toast.success('login successful ');
                setLoading(true)
                    setEmail('')
                    setPassword('')
                    setTimeout(()=>{
                            navigate('/')
                        },1500)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode.includes('auth/invalid-login-credentials')){
                        toast.error('user not match...please try again');
                }
            });
        }

    }

    const handleGoogle =()=>{
        signInWithPopup(auth, provider)
        .then(() => {
            setTimeout(()=>{
                navigate('/')
            },3000)
        }).catch((error) => {
            const errorCode = error.code;
        });
    }


  return (
    <>
    <section className="registration">
    <ToastContainer position="top-center" theme="dark"/>
        <div className="registration_main flex">
            <div className="registration_left w-1/2 flex justify-end pt-[100px] pr-[70px]">
                <div className="inf  relative">
                    <h1 className="font-nunito font-bold text-[35px] text-secondary_color">Login to your account!</h1>
                    <div onClick={handleGoogle} className='w-[70%] flex gap-[10px] text-[14px] font-bold font-open text-secondary_color border border-[#B3B3C9] mt-[30px] py-[20px] pl-[30px] pr-[40px] rounded-[10px] cursor-pointer'>
                        <img src={google} alt="img" />
                        <p>Login with Google</p>
                    </div>

                    <div className="mt-[35px] relative">
                        <p className=" bg-white  text-[16px] font-bold font-nunito text-[#585D8E]">Email Address</p>
                        <input onChange={handleEmail}  className=" w-full py-[10px] border-b border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type="email" placeholder="Email"/>
                        <p className='absolute left-0 bottom-[-27px] text-[16px] font-bold font-nunito text-red-500'>{emailErr}</p>
                    </div>
                    <div className="mt-[35px] relative">
                        <p className=" bg-white  text-[16px] font-bold font-nunito text-[#585D8E]">Email Address</p>
                        <input onChange={handlePassword} className=" w-full py-[10px] border-b border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none" type={passwordShow ? 'text' : 'password'} placeholder="Password"/>
                        <p className='absolute left-0 bottom-[-27px] text-[16px] font-bold font-nunito text-red-500'>{passwordErr}</p>
                        {
                            !passwordShow ? <BsEyeSlash onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[40px] right-[20px]' />
                            : <BsEye onClick={()=> setPasswordShow(!passwordShow)} className='absolute top-[40px] right-[20px]'/>
                        }
                        
                        
                    </div>



                    {
                        loading ?
                        <div className=' absolute top-[30%] left-[50%] translate-y-[-50%] bg-[#e5e5e5] w-[500px] h-[300px] flex justify-center items-center rounded-[10px]'>
                        <div>


                        <h1 className='text-secondary_color text-[25px] font-semibold'>please wait</h1>
                        <div className='flex justify-center items-center'>
                        <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}}wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
                        </div>


                        </div>

                    </div>
                    : <div onClick={handleLogin}>
                    <button  className="mt-[30px] text-center w-full py-[15px]  bg-primary_color rounded-[10px] text[20px] font-nunito font-semibold text-white">Login to Continue</button>
                </div>
                    }

                    <p className="mt-[10px] text-center text-[15px] font-normal font-open text-secondary_color">Don’t have an account ? <Link to='/registration' className="font-bold text-[#EA6C00] cursor-pointer">Sign Up</Link ></p>
                    <div className='text-center'>
                    <Link to='/forgotpassword' className="mt-[10px]  text-[15px] font-normal font-open text-secondary_color cursor-pointer">forgot password</Link>
                    </div>


                    

                    


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