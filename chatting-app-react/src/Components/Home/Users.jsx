import React, { useEffect } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import profile from '../../assets/profile.svg';
import { getDatabase, ref, onValue } from "firebase/database";

const Users = () => {
    const db = getDatabase();

    useEffect(()=>{
        const userRef = ref(db, 'user/');
        onValue(userRef, (snapshot) => {
            console.log(userRef);
            console.log(snapshot);
            // const data = snapshot.val();
            // updateStarCount(postElement, data);
            // console.log(data,'snapppppppppppppp');
        });
    },[])


  return (
    <>
    <div className='p-[10px] border overflow-y-scroll h-[315px] shadow-md rounded-[5px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>Users</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>


        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>
        <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
            <div className='flex gap-[20px]'>
            <div className='h-[50px] w-[50px] rounded-full'>
                <img src={profile} alt="img" />
            </div>
            <div>
                <h6 className='text-[15px] font-open font-semibold'>Friends Reunion</h6>
                <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
            </div>
            </div>
            <div>
                <button className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>+</button>
            </div>
        </div>



    </div>
    </>
  )
}

export default Users