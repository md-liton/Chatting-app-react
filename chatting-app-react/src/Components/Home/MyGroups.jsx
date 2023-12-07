import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import profile from '../../assets/profile.svg';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';

const MyGroups = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)

    const [mygroup,setMygroup]=useState([])

    useEffect(()=>{
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if(data.uid == item.val().adminid){
                    arr.push(item.val());
                }
            })
            setMygroup(arr);
        });
    },[])





  return (
    <>
     <div className='p-[10px] border overflow-y-scroll h-[250px] shadow-md rounded-[5px] mt-[20px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>My Groups</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>

        {
            mygroup.map((item)=>(
            <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>{item.groupname}</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys</p>
            </div>
            </div>
            <div>
                <p className='text-[12px]'>Today, 8:56pm</p>
            </div>
            </div>
            ))
        }




    </div>
    </>
  )
}

export default MyGroups