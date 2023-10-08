import React from 'react';
import profile from '../../assets/profile.svg';
import {AiOutlineHome,AiOutlineMessage} from 'react-icons/ai';
import{IoMdNotificationsOutline,IoMdLogOut} from 'react-icons/io';
import {FiSettings} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch} from 'react-redux';
import { userLogin } from '../../Slices/UserSlice';


const SideBar = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout =()=>{
    signOut(auth).then(() => {
      dispatch(userLogin(null))
      localStorage.removeItem('stringify')
    });
    navigate('/login')
  }
  return (
    <>
        <div>
        <div className='py-[25px] '>
            <div className=' flex justify-center '>
            <img className='cursor-pointer' src={profile} alt="img" />
            </div>
        </div>
        <div className='py-[15px] flex justify-center after:content-[""] after:absolute after:h-full after:w-[80%] after:bg-white after:top-0 after:right-0 after:rounded-l-lg relative after:z-[-1] z-[1] before:content-[""] before:absolute before:h-full before:w-[15px] before:top-0 before:right-0 before:bg-primary_color before:rounded-l-lg after:cursor-pointer before:cursor-pointer'>
        <AiOutlineHome className='h-[45px] w-[45px] text-primary_color cursor-pointer'/>
        </div>
        <div className='py-[15px] '>
          <div className='flex justify-center '>
          <AiOutlineMessage className='h-[45px] w-[45px] text-[#BAD1FF] cursor-pointer'/>
          </div>
        </div>
        <div className='py-[15px] '>
          <div  className='flex justify-center'>
            <IoMdNotificationsOutline className='h-[45px] w-[45px] text-white cursor-pointer'/>
          </div>
        </div>
        <div className='py-[15px] '>
          <div className='flex justify-center'>
          <FiSettings className='h-[45px] w-[45px] text-white cursor-pointer'/>
          </div>
        </div>
        <div className='pt-[70px] pb-[20px] '>
          <div className='flex justify-center'>
            <IoMdLogOut onClick={handleLogout} className='h-[45px] w-[45px] text-white cursor-pointer'/>
          </div>
        </div>
        </div>
    </>
  )
}

export default SideBar