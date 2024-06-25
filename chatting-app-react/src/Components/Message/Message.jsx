import React, { useState } from 'react'
import SideBar from '../Home/SideBar'
import MyGroups from '../Home/MyGroups'
import Friends from '../Home/Friends'
import {BsThreeDotsVertical} from 'react-icons/bs';

const Message = () => {

  const [show,setShow]=useState(false)


  return (
    <>
    <section className='h-screen'>


    <div className=''>
        <div className='flex  px-[15px] py-[10px]'>

          <div className='w-1/2 flex gap-[30px]'>
          <div className='w-[155px] bg-primary_color rounded-[10px]'>
            <SideBar active='message'/>
          </div>
          <div className='w-[420px]'>
            <Friends/>
            <MyGroups/>
          </div>
          </div>


          <div className='w-1/2'>
            <div className=' border h-full rounded-[10px]  bg-messages bg-cover bg-no-repeat bg-center'>

              <div className=' bg-pic bg-cover bg-no-repeat bg-center h-full'>



                 {/* Message part start */}

            <div className='h-full p-[20px] bg-white'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-center items-center gap-[10px] cursor-pointer'>
                <div className='h-[60px] w-[60px] rounded-full border flex justify-center items-center'>profile</div>
                <div>
                  <h5 className='font-bold'>name</h5>
                  <h5 className='text-[13px]'>online</h5>
                </div>
              </div>
              <div className='cursor-pointer'>
              <BsThreeDotsVertical className='text-primary_color'/>
              </div>
            </div>
            <div className='h-[1px] bg-[#777] w-full mt-[15px]'></div>

            {/* incomming message part start */}
            {/* incomming message part end */}



            {/* sending message part start */}
            {/* sending message part end */}

            
            </div>

            {/* Message part end */}



              </div>

           

            </div>
          </div>
        </div>
      </div> 
    </section>
    </>
  )
}

export default Message