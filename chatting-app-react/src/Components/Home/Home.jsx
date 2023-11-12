import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SearchBar from './SearchBar';
import GroupList from './GroupList';
import FriendRequest from './FriendRequest';
import Friends from './Friends';
import MyGroups from './MyGroups';
import Users from './Users';
import BlockUsers from './BlockUsers';
import { userLogin } from '../../Slices/UserSlice';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector(demo => demo.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false)
  const dispatch =useDispatch()

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
      dispatch(userLogin(user))
      localStorage.setItem('stringify',JSON.stringify(userLogin(user)))
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
          <div className='w-[420px]'>
            <SearchBar/>
            <GroupList/>
            <FriendRequest/>
          </div>
          <div className='w-[420px]'>
            <Friends/>
            <MyGroups/>
          </div>
          <div className='w-[420px]'>
            <Users/>
            <BlockUsers/>
          </div>
        </div>
      </div> 
      : <div className='py-[100px]'>
        <h1 className='text-[50px] text-center font-bold text-primary_color'>Please Verify Your Email</h1>
        <div className='flex justify-center pt-[25px]'>
        <Link to='/login' className=' font-bold text-white bg-primary_color py-[15px] px-[25px] rounded-[10px]'>Back to Login</Link>
        </div>
       </div>
      }
    </>
  )
}

export default Home