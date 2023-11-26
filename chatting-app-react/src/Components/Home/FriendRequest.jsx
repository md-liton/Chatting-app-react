import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import profile from '../../assets/profile.svg';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';



const FriendRequest = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)

    const [friendRequest,setFriendRequest]=useState([])
    
    // const [friends,setFriends]=useState([])


    useEffect(()=>{
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if(item.val().receiverid == data.uid){
                    arr.push({...item.val(), id:item.key});
                }
            })
            setFriendRequest(arr);
        });
    },[])

    const handleAccept =(item)=>{
        set(push(ref(db, 'friends/')), {
            ...item
          }).then(()=>{
            remove((ref(db, 'friendRequest/'+item.id)))
          })
    };

    const handleCancel =(item)=>{
        remove((ref(db, 'friendRequest/'+item.id)))
    }






  return (
    <>
    <div className='p-[10px] border overflow-y-scroll h-[250px] shadow-md rounded-[5px] mt-[15px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>Friend Request</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>

        {
            friendRequest.map((item)=>(
                <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
                    <div className='flex gap-[20px]'>
                    <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                        <img src={item.senderPhotoURL} alt="img" />
                    </div>
                    <div>
                        <h6 className='text-[15px] font-open font-semibold'>{item.sendername}</h6>
                        <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys</p>
                    </div>
                    </div>
                    <div className='flex gap-[3px]'>
                        <button onClick={()=>handleAccept(item)} className='px-[10px] py-[3px] bg-primary_color text-white text-[12px]  font-semibold font-open rounded-[5px]'>Accept</button>
                        <button onClick={()=>handleCancel(item)} className='px-[10px] py-[3px] bg-primary_color text-white text-[12px]  font-semibold font-open rounded-[5px]'>Cancel</button>
                    </div>
               </div>
            ))
        }




        



    </div>
    </>
  )
}

export default FriendRequest