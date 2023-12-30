import React, { createRef, useEffect, useState } from 'react';
import profile from '../../assets/profile.svg';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast} from 'react-toastify';
import { ColorRing } from  'react-loader-spinner';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const GroupList = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)


    const [creatGroup,setCreatGroup]=useState(false)
    const [groupname,setGroupname]=useState('')
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const [group,setGroup]=useState([])
    const [groupImg,setGroupImg]=useState(false)
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();

    const [imgss,setImgss]=useState(false)


    const handleCreateGroup=(e)=>{
        setGroupname(e.target.value);
        setError(false)
    }
    
    const done =()=>{
        if(groupname == ''){
            setError(true);
        }else{
            setLoading(true)
            set(push(ref(db, 'group/')), {
                groupname: groupname,
                groupPhoto:image,
                admin: data.displayName,
                adminid:data.uid,
              });
              toast.success('Group Creat Successful ');
              setTimeout(()=>{
                  setLoading(false)
                setCreatGroup(false)
            },1000)
        }
    }

    useEffect(()=>{
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if(data.uid != item.val().adminid){
                    arr.push(item.val());
                }
            })
            setGroup(arr);
        });
    },[])

    const handleGroupImg =()=>{
        setGroupImg(true)
    }

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        console.log(cropperRef,'litooooo');
        };
        reader.readAsDataURL(files[0]);
      };

      const handlerGroupImgCancel =()=>{
        setGroupImg(false)
        setImage('')
      }

      const handleGroupImgUpload =()=>{
        setImgss(true)
        setGroupImg(false)
      }






  return (
    <>
    <div className='p-[10px] border overflow-y-scroll h-[315px] shadow-md rounded-[5px]'>
    <ToastContainer position="top-center" theme="dark"/>

    <div className='flex justify-between items-center '>
        <p className='font-semibold text-[18px] font-open '>Group List</p>
        <button onClick={()=>setCreatGroup(!creatGroup)} className='px-[10px] py-[3px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>Creat Group</button>
    </div>

    {/* creact group part start */}
    {
        creatGroup &&
    <div  className='bg-primary_color absolute top-0 left-0 h-screen w-full z-[2] flex justify-center items-center'>
        <div className='h-[500px] w-[400px] border bg-[#a3a3a3] rounded-[10px]'>
            <div className='text-center mt-[80px]'>
            <h1 className='font-nunito font-semibold text-[35px] text-secondary_color'>Creat a Group</h1>
                <div onClick={handleGroupImg} className='h-[100px] w-[100px] rounded-full flex justify-center items-center mx-auto border overflow-hidden my-[10px] cursor-pointer'>
                    {
                        imgss ?
                        <img src={image} className='h-full w-full' alt="" />
                        :
                        <img src={profile} className='h-full w-full' alt="" />
                    }
                </div>


                <div className='relative'>
                <input onChange={handleCreateGroup}  className=" w-[70%] py-[10px] px-[30px] rounded-[10px] border border-4 border-[#B8B9CE] text-[20px] font-bold font-nunito text-secondary_color focus:outline-none mt-[15px]" type="text" placeholder="Group Name"/>
                <div className='absolute bottom-[-25px] left-[90px] text-red-500 '>
                {
                    error &&
                    <p className='font-semibold'>please input group name</p>
                }
                </div>
                </div>







                <div >
                    {
                        loading
                        ?
                        <div className=' absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#e5e5e5] w-[500px] h-[300px] flex justify-center items-center rounded-[10px]'>
                            <div>


                            <h1 className='text-secondary_color text-[25px] font-semibold'>please wait</h1>
                            <div className='flex justify-center items-center'>
                            <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}}wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
                            </div>


                            </div>

                        </div>
                        :
                        <div className='flex justify-center gap-[20px] mt-[35px]'>
                            <button onClick={done} className='px-[20px] py-[10px] bg-[#B8B9CE] text-primary_color text-[20px]  font-semibold font-open rounded-[5px] border border-primary_color'>Done</button>
                            <button onClick={()=>setCreatGroup(!creatGroup)} className='px-[20px] py-[10px] bg-[#B8B9CE] text-primary_color text-[20px]  font-semibold font-open rounded-[5px] border border-primary_color'>Cancel</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
    }
    {/* creact group part end */}

    {/* group img cropper part start */}

    {
        groupImg &&
        <div className='h-full w-full bg-primary_color absolute top-0 left-0 z-[10] flex justify-center items-center'>
            <div className='w-[500px] bg-white rounded px-[50px] py-[20px]'>
                <h3  className="font-nunito font-bold text-[35px] text-center text-secondary_color">Set a Group Photo</h3>


                
                <div className='my-[15px]  h-28 w-28 rounded-full mx-auto border'>
                    {
                    image ?
                    <div className="img-preview h-28 w-28 rounded-full overflow-hidden" />
                    :
                    <img className=' h-full w-full rounded-full' src={profile} alt="img" />
                }


                </div>


                

            {
                image &&
                <Cropper
                className='mb-[15px]'
                ref={cropperRef}
                style={{ height: 200, width: "100%" }}
                zoomTo={0}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={0}
                minCropBoxWidth={0}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} 
                guides={true}
                />
                }





                <input onChange={onChange}  type="file" />
                <div className='mt-[15px]'>
                <div>
                    <button onClick={handleGroupImgUpload} className='text-[14px] font-bold font-open text-white bg-secondary_color py-[15px] px-[20px] rounded-[8px] mr-[15px]'>Upload</button>
                    <button onClick={handlerGroupImgCancel}  className='text-[14px] font-bold font-open text-white bg-secondary_color py-[15px] px-[20px] rounded-[8px]'>Cancel</button>
                </div>
                
                </div>
            </div>
            </div>
    }

    {/* group img cropper part end */}


        {
            group.map((item)=>(
            <div className='flex justify-between items-center mt-[15px] border-b-[1px] pb-[10px] border-[#777]'>
                    <div className='flex gap-[20px]'>
                    <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                        <img src={item.groupPhoto} alt="img" className='h-full w-full'/>
                    </div>
                    <div>
                        <h6 className='text-[15px] font-open font-semibold'>{item.groupname}</h6>
                        <p className='text-[#4D4D4D] text-[13px] font-open font-semibold'>Hi Guys</p>
                    </div>
                    </div>
                    <div>
                        <button className='px-[20px] py-[5px] bg-primary_color text-white  font-semibold font-open rounded-[5px]'>Join</button>
                    </div>
            </div>
            ))
        }



    </div>
    </>
  )
}

export default GroupList