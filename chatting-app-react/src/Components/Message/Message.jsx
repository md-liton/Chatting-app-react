import React from 'react'
import SideBar from '../Home/SideBar'
import MyGroups from '../Home/MyGroups'
import Friends from '../Home/Friends'

const Message = () => {
  return (
    <>
    <section>

    <div className='h-screen'>
        <div className='flex gap-[43px] px-[15px] py-[10px]'>

          <div className='w-1/2 flex  justify-between'>
          <div className='w-[186px] bg-primary_color rounded-[10px]'>
            <SideBar active='message'/>
          </div>
          <div className='w-[420px]'>
            <Friends/>
            <MyGroups/>
          </div>
          </div>


          <div className='w-1/2'>
            <h1>ddddd</h1>
          </div>

        </div>
      </div> 
    </section>
    </>
  )
}

export default Message