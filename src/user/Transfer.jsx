import React, { useState } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { Currency, successMessage } from 'utils/functions'
import { FaAsterisk } from "react-icons/fa6";
import FormComponent from 'utils/FormComponent';
import ModalLayout from 'utils/ModalLayout';
import Loader from 'utils/Loader';
import { useSelector } from 'react-redux';

const Transfer = () => {
  const [bal, setBal] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [loading,setLoading] = useState(false)
  const [otp, setOtp] = useState(false)

  const Icon = bal ? IoEyeOutline : IoEyeOffSharp
  const profile = useSelector((state)=> state.profile.profile)
  const currency = useSelector((state)=> state.profile.currency)

  const RequestOtp = () => {
    setSubmit(false)
    setOtp(true)
  }

  const Otpsent = ()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      setOtp(false)
      successMessage('Code accepted, processing withdrawal')
    },3000)
    
  }
  return (
    <div className='w-full mt-5'>
      <div className="w-11/12 mx-auto ">
        <div className="bg-gradient-to-tr flex items-start flex-col  from-primary to-purple-700 px-6 py-10 rounded-lg">
          <div className="flex items-center gap-2 text-white text-sm font-extralight">
            <GoShieldLock className='text-green-400 text-lg' />
            <div className="text-2xl">Available Balance</div>
            <Icon onClick={() => setBal(prev => !prev)} className='text-2xl cursor-pointer' />
          </div>
          <div className="flex mt-5 self-center ">
            <div className="text-slate-200 text-2xl self-end font-bold">{currency}</div>
            <div className="font-bold text-3xl text-white">{bal ? profile?.balance :
              <>
                <div className="flex">
                  {new Array(3).fill(0).map((item, i) => (
                    <div className="flex items-center text-sm ml-2" key={i}><FaAsterisk /></div>
                  ))}
                </div>
              </>
            }</div>
          </div>
        </div>

        <div className="my-10 w-full flex items-start shadow-lg flex-col py-5 px-10 bg-white rounded-lg h-fit">

          {submit && <ModalLayout setModal={setSubmit} clas={`lg:w-fit w-11/12 mx-auto  `}>
            <div className="w-full h-fit bg-white px-5 py-8 rounded-md">
              <div className="text-center  font-semibold underline">Proceed to withdraw</div>
              <div className="my-3 text-base">Dear User, In order to complete your withdrawal you need to provide otp, which costs $45.</div>
              <div className="mt-3 w-full flex items-center justify-between">
                <button onClick={() => setSubmit(false)} className="w-fit px-4 py-2 rounded-md bg-red-600 text-white">Cancel</button>
                <button onClick={RequestOtp} className='w-fit px-4 py-2 rounded-md bg-primary text-white'>Request OTP</button>
              </div>
            </div>
          </ModalLayout>}
          {otp && <ModalLayout setModal={setOtp} clas={`lg:w-fit w-11/12 mx-auto  `}>
            <div className={`w-full h-fit bg-white px-5 py-8 rounded-md relative`}>
              {loading && 
              <div className="absolute flex items-center w-full top-1/3 -translate-x-1/2 left-1/2 justify-center">
                <Loader/>
              </div>
              }
              <div className="flex flex-col gap-3 items-start">
                <div className="text-center  font-semibold underline">Enter OTP Code</div>
                <FormComponent formtype='code' placeholder={`*****`}/>
                <button onClick={Otpsent} className='w-fit px-4 py-2 rounded-md bg-primary text-white'>Submit</button>
              </div>

            </div>
          </ModalLayout>}
          <div className="text-center my-3 w-full text-xl ">Bank Withdrawal</div>
          <div className="flex items-start flex-col gap-8 w-full">
            <div className="flex items-start flex-col  lg:w-1/2 w-full">
              <div className="-500 text-base">Account Full Name:</div>
              <input type="text" className='outline-none w-full border-b' />
            </div>
            <div className="flex items-start flex-col  lg:w-1/2 w-full">
              <div className="-500 text-base">Bank Name:</div>
              <input type="text" className='outline-none w-full border-b' />
            </div>
            <div className="flex items-start flex-col lg:w-1/2 w-full">
              <div className="-500 text-base">Account No:</div>
              <input type="text" className='outline-none w-full border-b' />
            </div>
            <div className="flex items-start flex-col lg:w-1/2 w-full">
              <div className="-500 text-base">Route No: (Optional)</div>
              <input type="text" className='outline-none w-full border-b' />
            </div>
            <div className="flex items-start flex-col lg:w-1/2 w-full">
              <div className="-500 text-base">Amount ($)</div>
              <input type="text" className='outline-none w-full border-b' />
            </div>

            <div onClick={() => setSubmit(!submit)} className="md:w-fit w-full cursor-pointer text-center md:ml-auto md:px-10 py-2 bg-primary rounded-md text-white">Submit</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfer