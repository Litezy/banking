import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { Currency, errorMessage, successMessage } from 'utils/functions'
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import FormComponent from 'utils/FormComponent';
import ModalLayout from 'utils/ModalLayout';
import Loader from 'utils/Loader';
import { useSelector } from 'react-redux';
import { Apis, GetApi, PostApi } from 'services/Api';
import { FaEdit } from 'react-icons/fa';
import ButtonComponent from 'utils/ButtonComponent';

const Transfer = () => {
  const [bal, setBal] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transfers, setTransfers] = useState([])
  const [verifications, setVerifications] = useState([])
  const [adminBanks, setAdminBanks] = useState([])
  const [paid, setPaid] = useState(false)

  const Icon = bal ? IoEyeOutline : IoEyeOffSharp
  const profile = useSelector((state) => state.profile.profile)
  const currency = useSelector((state) => state.profile.currency)
  const [screen, setScreen] = useState()

  const fetchTransfers = useCallback(async () => {
    try {
      const res = await GetApi(Apis.auth.user_transfers)
      // console.log(res.data)
      if (res.status === 200) {
        setTransfers(res.data[0])
        setVerifications(res.data[0]?.verifications[0])
      }
    } catch (error) {
      console.log(error)
      // errorMessage(error.message)
    }
  }, []);


  const fetchAdminBanks = useCallback(async () => {
    try {
      const res = await GetApi(Apis.auth.get_adminBanks)
      if (res.status === 200) {
        setAdminBanks(res.data)
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchTransfers()
    fetchAdminBanks()
  }, [])

  const [forms, setForms] = useState({
    acc_no: '',
    acc_name: '',
    bank_name: '',
    route: '',
    amount: ''
  })

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }




  const imgRef = useRef()
  const [proofimg, setProofimg] = useState({
    img: "",
    image: ''
  })

  const changeImage = (e) => {
    setProofimg({
      img: e.target.src,
      image: null
    })
  }

  // console.log(savings)
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file.size >= 1000000) {
      imgRef.current.value = null
      return errorMessage('file too large')
    }
    if (!file.type.startsWith(`image/`)) {
      imgRef.current.value = null
      return errorMessage('Invalid file format detected, try with a different photo format like ')
    }
    setProofimg({
      img: URL.createObjectURL(file),
      image: file
    })
    // console.log(proofimg.image)
  }

  const UploadProof = async () => {
    const formdata = new FormData()
    formdata.append('image', proofimg.image)
    setLoading(true)
    try {
      const res = await PostApi(Apis.auth.upload_trans_prof, formdata)
      // console.log(res)
      if (res.status === 200) {
        fetchTransfers()
        setScreen(2)
        successMessage(`payment proof submitted successfully`)
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (verifications && transfers) {
      if (verifications.message && verifications.message.trim() !== '') {
        setScreen(3);
      } else if (!verifications.message || verifications.message === '' && verifications.verified === 'false') {
        setScreen(2);
      }
      
    }
    else if(!verifications && !transfers){
      setScreen(1);
    }
  }, [transfers, verifications]);


  const SubmitTransfer = async (e) => {
    if (!forms.acc_name) return errorMessage('Account name is required')
    if (!forms.acc_no) return errorMessage('Account number is required')
    if (!forms.bank_name) return errorMessage('Bank name is required')
    if (!forms.amount) return errorMessage('Amount is required')
    if (profile?.balance < forms.amount) return errorMessage('Insufficient balance')
    const formdata = {
      acc_no: forms.acc_no,
      acc_name: forms.acc_name,
      bank_name: forms.bank_name,
      route: forms.route,
      amount: forms.amount
    }
    setLoading(true)
    try {
      const res = await PostApi(Apis.auth.transfer, formdata)
      if(res.status === 200){
        successMessage(res.msg)
        fetchTransfers()
        setScreen(2)
        setForms({
          ...forms,
          acc_no: '',
          acc_name: '',
          bank_name: '',
          route: '',
          amount: ''
        })
      }else{
        errorMessage(res.msg)
      }

    } catch (error) {
       errorMessage(error.mesage)
       console.log(error)
    }finally{
      setLoading(false)
    }
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

        {screen === 1 &&
          <div className="my-10 w-full relative flex items-start shadow-lg flex-col py-5 px-10 bg-white rounded-lg h-fit">

            {loading &&
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                <Loader />
              </div>
            }
            <div className="text-center my-3 w-full text-xl ">Bank Withdrawal</div>
            <div className="flex items-start flex-col gap-8 w-full">
              <div className="flex items-start flex-col  lg:w-1/2 w-full">
                <div className="-500 text-base">Account Full Name:</div>
                <FormComponent  name={`acc_name`} value={forms.acc_name} onchange={handleChange}/>
              </div>
              <div className="flex items-start flex-col  lg:w-1/2 w-full">
                <div className="-500 text-base">Bank Name:</div>
                <FormComponent name={`bank_name`} value={forms.bank_name} onchange={handleChange}/>
              </div>
              <div className="flex items-start flex-col lg:w-1/2 w-full">
                <div className="-500 text-base">Account No:</div>
                <FormComponent formtype='phone' name={`acc_no`} value={forms.acc_no} onchange={handleChange}/>
              </div>
              <div className="flex items-start flex-col lg:w-1/2 w-full">
                <div className="-500 text-base">Route No: (Optional)</div>
                <FormComponent formtype='phone' name={`route`} value={forms.route} onchange={handleChange}/>
              </div>
              <div className="flex items-start flex-col lg:w-1/2 w-full">
                <div className="-500 text-base">Amount ($)</div>
               <FormComponent formtype='phone' name={`amount`} value={forms.amount} onchange={handleChange}/>
              </div>

              <div onClick={SubmitTransfer} className="md:w-fit w-full cursor-pointer text-center md:ml-auto md:px-10 py-2 bg-primary rounded-md text-white">Submit</div>
            </div>
          </div>}

        {screen === 2 &&
          <div className="w-full mt-5 h-96 relative flex items-center justify-center">
            <div className="md:w-[40%] w-10/12 mx-auto flex-col bg-white rounded-md p-5 h-fit flex items-center justify-center">
              <Loader />
              <div className="">withdrawal processing...</div>
            </div>
          </div>

        }
        {screen === 3 &&
          <div className="w-full mt-5 h-fit p-5">
            <div className="w-full p-5 bg-white rounded-md">
              <div className="text-lg font-semibold text-center capitalize mb-3">Steps to complete your transfer</div>
              <div className="w-full flex-col flex md:flex-row items-start gap-5 ">
                <div className="my-5 flex items-start flex-col gap-3 w-full md:w-1/2">
                  <div className="text-base font-light">{verifications.message}.</div>
                  <div className="text-2xl font-bold">{currency}{verifications?.amount}</div>
                </div>
                <div className="my-5 flex items-start md:w-1/2 flex-col gap-3 w-full ">
                  <div className="">Kindly make payment to {adminBanks.length > 1 ? 'any of these bank accounts below.' : "this bank account below."}</div>
                  {adminBanks.map((bank, i) => (
                    <div className="flex items-start  flex-col gap-1 w-fit p-5 bg-primary text-white mb-5 rounded-md" key={i}>
                      <div className="text-base font-light gap-2 flex items-center">
                        <div className="">Account Holder's Name:</div>
                        <div className="">{bank.fullname}</div>
                      </div>
                      <div className="text-base font-light gap-2 flex items-center">
                        <div className="">Bank Name:</div>
                        <div className="">{bank.bank_name}</div>
                      </div>
                      <div className="text-base font-light gap-2 flex items-center">
                        <div className="">Account No:</div>
                        <div className="">{bank.account_no}</div>
                      </div>
                      {bank.route_no && <div className="text-base font-light gap-2 flex items-center">
                        <div className="">Route:</div>
                        <div className="">{bank.route_no}</div>
                      </div>}
                      {bank.swift && <div className="text-base font-light gap-2 flex items-center">
                        <div className="">Swift No:</div>
                        <div className="">{bank.route_no}</div>
                      </div>}
                      {bank.iban && <div className="text-base font-light gap-2 flex items-center">
                        <div className="">IBAN No:</div>
                        <div className="">{bank.route_no}</div>
                      </div>}
                    </div>
                  ))}

                  <button onClick={() => setScreen(4)} className=" cursor-pointer w-fit px-4 py-2  rounded-full bg-gradient-to-tr   from-primary to-purple-700 border text-white ml-auto">I have made payment</button>
                </div>
              </div>
            </div>
          </div>

        }

        {screen === 4 &&
          <div className="my-10 w-11/12 bg-white p-5 rounded-md">
            <button onClick={() => setScreen(3)} className='w-fit mr-auto px-3 py-1 rounded-md bg-primary text-white'>back</button>
            <div className="text-xl text-center font-semibold">Upload proof of payment</div>

            <div className="mt-3 relative w-2/4 mx-auto">

              {loading &&
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                  <Loader />
                </div>
              }
              <label className={`${proofimg.img ? '' : 'border-2 border-black'} mt-5 w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                {proofimg.img ? <div className="">
                  <div onChange={changeImage} className="absolute top-0 right-0 main font-bold ">
                    <FaEdit className='text-2xl' />
                  </div>
                  <img src={proofimg.img} className='w-full h-48' />
                </div> :
                  <div className="flex items-center gap-2 px-2">
                    <FaPlus className='text-2xl' />
                    <div className="">Upload proof of payment</div>
                  </div>

                }
                <input type="file" onChange={handleImage} hidden ref={imgRef} />
              </label>
            </div>
            {proofimg.img &&
              <div className="w-1/4 mx-auto mt-5">
                <ButtonComponent type='button' onclick={UploadProof} title={'Submit'} bg={`bg-primary text-white h-12`} />
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Transfer