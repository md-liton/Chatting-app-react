import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import profile from '../../assets/profile.svg';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockUsers = () => {
    const db = getDatabase();
    const [block,setBlock]=useState([])
    const data = useSelector(state=>state.userLoginInfo.userInfo)

    useEffect(()=>{
        const blockRef = ref(db, 'block/');
        let arr =[]
        onValue(blockRef, (snapshot) => {
            snapshot.forEach((item)=>{
                if(data.uid == item.val().blockbyid){
                    arr.push({...item.val(), key:item.key})
                }
            })
        });
        setBlock(arr)
    },[block])

    const handleUnblock =(item)=>{
        console.log(item.key,'iiii');
        set(push(ref(db, 'friends/')), {
            sendername:item.blockby,
            senderid:item.blockbyid,
            senderPhotoURL:item.blockbyPhotoURL,
            receivername:item.block,
            receiverid:item.blockid,
            receiverPhotoURL:item.blockPhotoURL,
          }).then(()=>{
            remove((ref(db, 'block/'+item.key)))
          })
    };



  return (
    <>
     <div className='p-[10px] border overflow-y-scroll h-[250px] shadow-md rounded-[5px] mt-[15px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>Block Users</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>

        {
            block.map((item)=>(
                <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
                <div className='flex gap-[20px]'>
                <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                    <img src={item.blockPhotoURL} alt="img" />
                </div>
                <div>
                    <h6 className='text-[15px] font-open font-semibold'>{item.block}</h6>
                    <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Today, 8:56pm</p>
                </div>
                </div>
                <div>
                    <button onClick={()=>handleUnblock(item)} className='px-[20px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>unblock</button>
                </div>
            </div>
            ))
        }


       



    </div>
    </>
  )
}

export default BlockUsers