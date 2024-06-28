import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {SlOptionsVertical} from 'react-icons/sl';
import { getDatabase, ref, onValue, set, push, remove} from 'firebase/database';
import { useSelector } from 'react-redux';


const Friends = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const [friendList,setFriendList]=useState([])


    useEffect(()=>{
        const friendAcceptRef = ref(db, 'friends/');
        onValue(friendAcceptRef, (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
                if(data.uid == item.val().receiverid || data.uid == item.val().senderid){
                    arr.push({...item.val(),key:item.key});
                }
            })
            setFriendList(arr);
        });
    },[])

    const handleBlock =(item)=>{
        if(data.uid == item.senderid){
            set(push(ref(db, 'block/') ), {
                blockby: item.sendername,
                blockbyid:item.senderid,
                blockbyPhotoURL:item.senderPhotoURL,
                block:item.receivername,
                blockid:item.receiverid,
                blockPhotoURL:item.receiverPhotoURL,
            }).then(()=>{
                remove( ref(db, 'friends/' + item.key) )
            })
        }else if(data.uid==item.receiverid){
            set(push(ref(db, 'block/') ), {
                blockby: item.receivername,
                blockbyid:item.receiverid,
                blockbyPhotoURL:item.receiverPhotoURL,
                block:item.sendername,
                blockid:item.senderid,
                blockPhotoURL:item.senderPhotoURL,
            }).then(()=>{
                remove( ref(db, 'friends/' + item.key) )
            })
        }
    }

    const handleMessageOpen =()=>{
        console.log('okkkkkkk');
    }


  return (
    <>
    <div className='p-[10px] border overflow-y-scroll h-[315px] shadow-md rounded-[5px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>Friends</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>

        {
            friendList.map((item)=>(
                <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
                    <div className='flex gap-[20px] cursor-pointer' onClick={handleMessageOpen}>
                    <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                        <img src={
                            data.uid == item.receiverid ? item.senderPhotoURL : item.receiverPhotoURL
                        } alt="img" />
                    </div>
                    <div>
                        <h6 className='text-[15px] font-open font-semibold'>
                            {
                                data.uid == item.receiverid ? item.sendername : item.receivername
                            }
                        </h6>
                        <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <div onClick={()=>handleBlock(item)} className='relative'>
                        <h3 className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px] text-[12px] cursor-pointer'>Block</h3>
                    </div>
                </div>
            ))
        }
        



    </div>
    </>
  )
}

export default Friends