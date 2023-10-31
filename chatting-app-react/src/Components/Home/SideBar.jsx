import React, { createRef, useState } from 'react';
import profile from '../../assets/profile.svg';
import {AiOutlineHome,AiOutlineMessage,AiOutlineCloudUpload} from 'react-icons/ai';
import{IoMdNotificationsOutline,IoMdLogOut} from 'react-icons/io';
import {FiSettings} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useDispatch, useSelector} from 'react-redux';
import { userLogin } from '../../Slices/UserSlice';
import './SideBar.css';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";


const SideBar = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storage = getStorage();
  const data = useSelector(state => state.userLoginInfo.userInfo.payload.user.photoURL)
  console.log(data);
  





  const [upload,setUpload]=useState(false)
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const handleLogout =()=>{
    signOut(auth).then(() => {
      dispatch(userLogin(null))
      localStorage.removeItem('stringify')
    });
    navigate('/login')
  }
  const handleUpload=()=>{
    setUpload(true)
  }
  const handleCancel = ()=>{
    setUpload(false)
    setImage('')
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
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage,auth.currentUser.uid);

      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            })
          });
        });
        setUpload(false)
      }
    };



  return (
    <>
        <div>
        
        {
          upload?
          <div className='h-full w-full bg-primary_color absolute top-0 left-0 z-[10] flex justify-center items-center'>
          <div className='w-[500px] bg-white rounded p-[50px]'>
            <h3  className="font-nunito font-bold text-[35px] text-secondary_color">Upload a profile picture</h3>


            <div className='my-[15px]  h-28 w-28 rounded-full mx-auto'>
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





            <input onChange={onChange} type="file" />
            <div className='mt-[15px]'>
              <button onClick={getCropData } className='text-[14px] font-bold font-open text-white bg-secondary_color py-[15px] px-[20px] rounded-[8px] mr-[15px]'>Upload</button>
              <button onClick={handleCancel}  className='text-[14px] font-bold font-open text-white bg-secondary_color py-[15px] px-[20px] rounded-[8px]'>Cancel</button>
            </div>
          </div>
        </div>
        :
        <div onClick={handleUpload}  className='py-[25px] '>
            <div className=' flex justify-center '>
            <div className='w-20 h-20 rounded-full relative hover:after:content-[""] hover:after:absolute hover:after:top-0 hover:after:left-0 hover:after:bg-overlay_color hover:after:h-full hover:after:w-full hover:after:rounded-full after:duration-300 cursor-pointer profile mb-[10px]'>
            <img className='cursor-pointer h-full w-full rounded-full' src={data} alt="img" />
            <div>
            <AiOutlineCloudUpload className='icon h-[30px] w-[30px] absolute top-[25px] left-[25px] text-white '/>
            </div>
            </div>
            </div>
        </div>

        }





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