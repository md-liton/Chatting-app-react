import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs'

const SearchBar = () => {
  return (
    <>
       <div className='relative mb-[10px]'>
       <input className='focus:outline-none w-full border rounded-[10px] py-[10px] px-[35px] font-semibold shadow-md ' type="text" placeholder='Search' />
       <AiOutlineSearch className='text-[20px] absolute top-[14px] left-[10px]'/>
       <BsThreeDotsVertical className='text-[20px] absolute top-[18px] right-[10px] cursor-pointer text-primary_color'/>
       </div>
    </>
  )
}

export default SearchBar