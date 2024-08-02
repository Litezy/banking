import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMailUnreadSharp } from "react-icons/io5";
import ModalLayout from 'utils/ModalLayout';
import EmailandPassModal from 'utils/EmailandPassModal';
import { FaUserCog } from "react-icons/fa";


const Settings = () => {
 
    const [passscreen,setPassScreen] = useState(false)
    const [emailscreen,setEmailScreen] = useState(false)
   
  return (
    <div className='mt-10'>
      <div className={`w-11/12 mx-auto rounded-lg  `}>
       <div className="px-4 md:px-0 w-11/12 mx-auto md:grid grid-cols-2 gap-5 ">
          <div  className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div onClick={()=> setPassScreen(true)} className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
              <RiLockPasswordFill className='text-5xl text-primary'/>
              <h1 className='text-sm md:text-lg'>Change Account Password</h1>
            </div>
          </div>
          <div  className="bg-white h-48 mt-5 md:mt-0 w-full mx-auto rounded-md border shadow-lg cursor-pointer ">
            <div onClick={()=> setEmailScreen(true)} className="w-11/12 mx-auto flex items-center justify-center gap-5  h-full">
              <IoMailUnreadSharp  className='text-5xl text-primary'/>
              <h1 className='text-sm md:text-lg'>Change Account Email</h1>
            </div>
          </div>
        </div>

        {passscreen  && 
        <ModalLayout setModal={setPassScreen} clas={`md:w-1/2 w-11/12`}>
            <EmailandPassModal pass={true} setModal={setPassScreen}/>
        </ModalLayout>
        }
        {emailscreen  && 
        <ModalLayout setModal={setEmailScreen} clas={`md:w-1/2 w-11/12`}>
            <EmailandPassModal email={true} setModal={setEmailScreen}/>
        </ModalLayout>
        }
      </div>
    </div>
  )
}

export default Settings