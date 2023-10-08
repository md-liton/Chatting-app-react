import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector(demo => demo.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
    }
  });




  useEffect(()=>{
    if(!data){
      setTimeout(()=>{
        navigate('/login')
      })
    }
  })
  return (
    <>
      {
        verify ?
        <div className='h-screen'>
        <div className='flex gap-[43px] p-[15px]'>
          <div className='w-[186px] bg-primary_color rounded-[10px]'>
            <SideBar/>
          </div>
          <div className='w-[427px]'>asdfasd</div>
          <div className='w-[344px]'>asdfsda</div>
          <div className='w-[344px]'>sdfsdf</div>
        </div>
      </div> 
      : <h1 className='text-[50px] text-center font-bold text-primary_color'>Please Verify Your Email</h1>
      }
    </>
  )
}

export default Home