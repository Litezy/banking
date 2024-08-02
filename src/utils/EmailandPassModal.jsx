import React, { useState } from 'react'
import { RiCloseLargeFill } from 'react-icons/ri'
import { RiLockPasswordFill } from "react-icons/ri";


import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Forminput from './Forminput';
import ButtonComponent from './ButtonComponent';
import FormComponent from './FormComponent';
import Loader from './Loader';
import { successMessage } from './functions';

const EmailandPassModal = ({ email, pass, emaildiv, setModal }) => {

    const [loading,setLoading] = useState(false)

    const savePassword = (e)=>{
        e.preventDefault()
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            successMessage('password saved')
            setModal(false)
        },2000)

    }
    const saveEmail = (e)=>{
        e.preventDefault()
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            successMessage('Email saved')
            setModal(false)
        },2000)

    }
    return (
        <div ref={emaildiv} className="w-full bg-white h-fit py-3 rounded-lg relative ">
            <div className="flex w-full justify-between items-center px-3">
                <div className="text-xl font-bold">Change {email ? 'Email' : 'Password'}</div>
                <RiCloseLargeFill onClick={() => setModal(false)} className='text-2xl cursor-pointer' />
            </div>
            <hr className='my-5 bg-gray' />

            {loading && 
            <div className="absolute h-full  top-1/2 left-1/2 -translate-x-1/2 items-center justify-center">
                <Loader/>
            </div>
            }
            <form onSubmit={pass ?savePassword: saveEmail} className="w-11/12 mx-auto">
                {email && <MdOutlineMarkEmailRead className='text-center w-full text-6xl mb-10 text-primary' />}
                {pass && <RiLockPasswordFill className='text-center w-full text-6xl mb-10 text-primary' />}
                <div className="w-full flex items-start flex-col gap-3">
                    <div className="flex items-start flex-col w-full">
                        <div className="text-primary font-bold text-[1rem]">Current {email ? ' Email' : 'Password'}</div>
                        <FormComponent formtype={`${pass ? 'password':'email'}`} placeholder={`${pass ? '*****':'current address'}`} />
                    </div>
                    <div className="flex items-start flex-col w-full">
                        <div className="text-primary font-bold text-[1rem]">New {email ? ' Email' : 'Password'}</div>
                        <FormComponent formtype={`${pass ? 'password':'email'}`} placeholder={`${pass ? '*****':'current address'}`} />
                        {email && <div className="text-sm">An email will be sent to this new email for verification.</div>}
                    </div>
                </div>
                <div className=" mt-14">
                    {email && <ButtonComponent  
                    type={`submit`}
                    bg={`bg-primary text-white h-10`}  
                    title={`Save Changes`} />}


                    {pass && <ButtonComponent 
                    bg={`bg-primary text-white h-10`} 
                    title={`Save Password`} />}
                </div>
            </form>
        </div>
    )
}

export default EmailandPassModal