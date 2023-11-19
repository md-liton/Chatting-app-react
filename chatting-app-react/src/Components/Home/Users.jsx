import React, { useEffect, useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import profile from '../../assets/profile.svg';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Users = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const [userData,setUserData] = useState([]);
    const [friendRequest,setFriendRequest]=useState([])
    const [friendList,setFriendList]=useState([])
    

    useEffect(()=>{
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if(data.uid != item.key){
                    arr.push(item.val());
                }
            })
            setUserData(arr);
        });
    },[])


    const handleRequest =(item)=>{
        set(push(ref(db, 'friendRequest/') ), {
            sendername: data.displayName,
            senderid:data.uid,
            receivername:item.username,
            receiverid:item.uid
          });
    };


    useEffect(()=>{
        const friendRequestRef = ref(db, 'friendRequest/');
        onValue(friendRequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                arr.push(item.val().receiverid+item.val().senderid);
            })
            setFriendRequest(arr);
        });
    },[])

    useEffect(()=>{
        const friendAcceptRef = ref(db, 'friends/');
        onValue(friendAcceptRef, (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
                arr.push(item.val().receiverid+item.val().senderid);
            })
            setFriendList(arr);
        });
    },[])





  return (
    <>
    <div className='p-[10px] border overflow-y-scroll h-[315px] shadow-md rounded-[5px]'>
        <div className='flex justify-between'>
        <p className='font-semibold text-[18px] font-open'>Users</p>
        <BsThreeDotsVertical className='text-primary_color'/>
        </div>


        {
            userData.map((item)=>(
                <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
                    <div className='flex gap-[20px]'>
                    <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                        <img  src={profile} alt="img" />
                    </div>
                    <div>
                        <h6 className='text-[15px] font-open font-semibold'>{item.username}</h6>
                        <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi,Guyes</p>
                    </div>
                    </div>
                    <div>
                        {
                            friendList.includes(item.uid+data.uid) || friendList.includes(data.uid+item.uid)
                            ?
                            <button  className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px] text-[12px]'>Friend</button>
                            :
                            friendRequest.includes(item.uid+data.uid) || friendRequest.includes(data.uid+item.uid)
                            ?
                            <button  className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px] text-[12px]'>Requested</button>
                            :
                            <button onClick={()=>handleRequest(item)} className='px-[10px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px] text-[12px]'>Add Friend</button>
                        }
                    </div>
                </div>
            )
            )
        }


        



    </div>
    </>
  )
}

export default Users