import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { Currency, errorMessage, successMessage } from 'utils/functions'
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import FormComponent from 'utils/FormComponent';
import ModalLayout from 'utils/ModalLayout';
import Loader from 'utils/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Apis, GetApi, PostApi } from 'services/Api';
import { FaEdit } from 'react-icons/fa';
import ButtonComponent from 'utils/ButtonComponent';
import { dispatchProfile } from 'app/reducer';
import Lottie from 'lottie-react';
import animationLogo from "../assets/animation.json"
import moment from 'moment';

const Transfer = () => {
  const [bal, setBal] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)


  const Icon = bal ? IoEyeOffSharp : IoEyeOutline
  const profile = useSelector((state) => state.profile.profile)
  const currency = useSelector((state) => state.profile.currency)
  const [screen, setScreen] = useState(1)
  const [receipt, setReceipt] = useState({})
  const dispatch = useDispatch()
  const [transactionId, setTransactionId] = useState('')

  // const fetchTransfers = useCallback(async () => {
  //   try {
  //     const res = await GetApi(Apis.auth.get_transfers)
  //     const response = await GetApi(Apis.auth.get_adminBanks)
  //     setAdminBanks(response.data)
  //     // console.log(res, 'post')
  //     if (res.status !== 200) return errorMessage(`${res.msg}`)
  //     const trans = res.data
  //     setTransfers(trans[0]);
  //     if (res.data.length < 1) return setScreen(1)
  //     if (res.data[0]?.status === 'pending' && (!res.data[0]?.verifications || res.data[0]?.verifications.length < 1)) return setScreen(2)
  //     if (res.data[0]?.status === 'complete') return setScreen(1)
  //     //   const checks = trans[0]?.verifications.filter((item) => item.verified === 'false')
  //     // console.log(checks, 'pol')
  //     const checkCodeSubmission = res.data[0]?.verifications.find(ele => ele.verified === 'true')
  //     const checkMessage = res.data[0]?.verifications.find(ele => (ele.verified === 'false' && ele.image === null && ele.message !== null))
  //     const checkImage = res.data[0]?.verifications.find(ele => (ele.verified === 'false' && ele.image !== null && ele.code === null))
  //     const checkCode = res.data[0]?.verifications.find(ele => (ele.verified === 'false' && ele.image !== null && ele.code !== null))
  //     if (checkMessage) {
  //       setScreen(3)
  //       return setVerifications(checkMessage)
  //     }
  //     if (checkImage) {
  //       setScreen(2)
  //       return setVerifications(checkImage)
  //     }
  //     if (checkCode) {
  //       setScreen(5)
  //       console.log(checkCode, 'check image')
  //       return setVerifications(checkCode)
  //     }
  //     if (checkCodeSubmission) {
  //       console.log(checkCodeSubmission, 'subkisson')
  //       setScreen(2)
  //       return setVerifications(checkCodeSubmission)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, []);




  const [forms, setForms] = useState({
    acc_no: '',
    acc_name: '',
    bank_name: '',
    swift: '',
    amount: '',
    reset_code: '',
    memo: ''
  })

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }


  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await GetApi(Apis.auth.profile);
      if (response.status !== 200) return;
      dispatch(dispatchProfile(response.data));
    } catch (error) {
      errorMessage(`error in fetching profilee`, error.message);
    }
  }, [dispatch]);


  const NextScreen = () => {
    if (!forms.acc_name) return errorMessage('Account name is required')
    if (!forms.acc_no) return errorMessage('Account number is required')
    if (!forms.bank_name) return errorMessage('Bank name is required')
    if (!forms.amount) return errorMessage('Amount is required')
    if (!forms.memo) return errorMessage('Memo is required')
    if (profile?.balance < forms.amount) return errorMessage('Insufficient balance')
    setScreen(2)
  }

  const SubmitTransfer = async () => {
    const formdata = {
      acc_no: forms.acc_no,
      acc_name: forms.acc_name,
      bank_name: forms.bank_name,
      swift: forms.swift,
      amount: forms.amount,
      memo: forms.memo
    }
    // return console.log(formdata)
    setLoading(true)
    try {
      const res = await PostApi(Apis.auth.transfer, formdata)
      if (res.status === 200) {
        successMessage(res.msg)
        setScreen(2)
        setForms({
          ...forms,
          acc_no: '',
          acc_name: '',
          bank_name: '',
          swift: '',
          amount: '',
          memo: ''
        })
        setReceipt(res.data)
        setTransactionId(res.transId)
        setTimeout(() => {
          setScreen(3)
          fetchUserProfile()
        }, 2000)
      } else {
        errorMessage(res.msg)
      }

    } catch (error) {
      errorMessage(error.mesage)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='w-full mt-5'>
      <div className="w-11/12 mx-auto ">
        <div className="bg-gradient-to-tr flex items-center justify-center flex-col  from-primary to-purple-700 px-6 py-10 rounded-lg">
          <div className="flex items-center gap-2 text-white text-sm font-extralight">
            <GoShieldLock className='text-green-400 text-lg' />
            <div className="lg:text-2xl text-base">Available Balance</div>
            <Icon onClick={() => setBal(prev => !prev)} className='text-2xl cursor-pointer' />
          </div>
          <div className="flex mt-3 self-center ">
            <div className="text-slate-200 text-2xl self-end font-bold">{currency}</div>
            <div className="font-bold text-2xl text-white">{bal ? profile?.balance?.toLocaleString() :
              <>
                <div className="flex">
                  {new Array(5).fill(0).map((item, i) => (
                    <div className="flex items-center text-sm ml-2" key={i}><FaAsterisk /></div>
                  ))}
                </div>
              </>
            }</div>
          </div>
        </div>
        {/* ========================   transfer form ============ */}
        {screen === 1 &&
          <div className="my-10 w-full relative flex items-start shadow-lg flex-col py-5 px-2 lg:px-10 bg-white rounded-lg h-fit">

            <div className=" my-3 w-full text-xl font-semibold border-b">External Money Transfer</div>
            <div className="flex items-start flex-col gap-8 w-full mt-3">
              <div className="flex w-full items-center flex-col lg:flex-row justify-between gap-5 lg:gap-10">
                <div className="flex items-start flex-col  lg:w-1/2 w-full">
                  <div className="-500 text-base">Account Name:</div>
                  <FormComponent name={`acc_name`} value={forms.acc_name} onchange={handleChange} />
                </div>
                <div className="flex items-start flex-col  lg:w-1/2 w-full">
                  <div className="-500 text-base">Bank Name:</div>
                  <FormComponent name={`bank_name`} value={forms.bank_name} onchange={handleChange} />
                </div>
              </div>
              <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10">
                <div className="flex items-start flex-col lg:w-1/2 w-full">
                  <div className="-500 text-base">Account No:</div>
                  <FormComponent formtype='phone' name={`acc_no`} value={forms.acc_no} onchange={handleChange} />
                </div>
                <div className="flex items-start flex-col lg:w-1/2 w-full">
                  <div className="-500 text-base">Swift No: (required for int'l transfers)</div>
                  <FormComponent formtype='phone' name={`swift`} value={forms.swift} onchange={handleChange} />
                </div>
              </div>

              <div className="flex items-start flex-col lg:w-1/2 mx-auto w-full">
                <div className="-500 text-base">Amount ($)</div>
                <FormComponent formtype='phone' name={`amount`} value={forms.amount} onchange={handleChange} />
              </div>
              <div className="flex items-start flex-col  w-full">
                <div className=" text-base">Memo</div>
                <textarea
                  name='memo'
                  value={forms.memo}
                  className='w-full  max-h-20 resize-none p-2 rounded-md border hover:border-black'
                  onChange={handleChange}
                  placeholder='memo'
                >
                </textarea>
              </div>

              <button onClick={NextScreen} className="md:w-fit w-full cursor-pointer text-center md:ml-auto md:px-10 py-2 bg-gradient-to-tr from-primary to-purple-700 rounded-md text-white">Next</button>
            </div>
          </div>}


        {screen === 2 &&
          <div className="my-10 lg:w-[60%] mx-auto w-full relative flex items-start shadow-lg flex-col py-5 px-3 lg:px-10 bg-white rounded-lg h-fit">

            {loading &&
              <div className="fixed top-0 z-50 backdrop-blur-sm w-full h-full rounded-md left-1/2 -translate-x-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md bg-white"><Loader /></div>
              </div>
            }

            <button onClick={() => setScreen(1)} className='bg-gradient-to-tr from-primary to-purple-700 text-white w-fit px-4 py-1 rounded-md'>
              edit
            </button>
            <div className="text-left w-full font-bold my-5 text-xl">Review your transfer details</div>

            <div className="mt-6 flex items-start gap-5 flex-col w-full ">
              <div className="flex w-full items-center flex-col  justify-between gap-5 lg:gap-10">
                <div className="flex items-center gap-3  w-full">
                  <div className="-500 text-base">Receiver's Account Name:</div>
                  <div className="capitalize text-base font-bold">{forms.acc_name}</div>
                </div>
                <div className="flex items-center gap-3  w-full">
                  <div className="-500 text-base">Receiver's Bank Name:</div>
                  <div className="capitalize text-base font-bold">{forms.bank_name}</div>
                </div>
                <div className="flex items-center gap-3  w-full">
                  <div className="-500 text-base">Swift Code:</div>
                  <div className="capitalize text-base font-bold">{forms.swift}</div>
                </div>
                <div className="flex items-center gap-3  w-full">
                  <div className="-500 text-base">Amount({currency}):</div>
                  <div className="capitalize text-base font-bold">{forms.amount}</div>
                </div>

                <div className="flex items-center gap-3  w-full">
                  <div className="-500 text-base">Memo:</div>
                  <div className="capitalize text-base font-bold">{forms.memo}</div>
                </div>


                <div className="w-full my-5">
                  <ButtonComponent disabled={loading ? true : false} type='button' onclick={SubmitTransfer} title={'Send'} bg={`bg-gradient-to-tr from-primary to-purple-700 text-white h-14`} />
                </div>
              </div>
            </div>
          </div>

        }


        {screen === 3 &&
          <div className="my-10 lg:w-[60%] mx-auto w-full relative flex items-center shadow-lg flex-col py-5 px-3 lg:px-10 bg-white rounded-lg h-fit">
            <div className="my-3 text-center text-2xl font-light">Transfer Successful</div>
            <Lottie
              animationData={animationLogo}
              className="w-auto h-72"
              loop={true}
            />

            <div className="my-5">
              <div className="text-center font-semibold text-xl">Transfer Receipt</div>
              <div className="mt-3 flex items-start gap-2 flex-col w-full ">
                <div className="flex w-full items-center flex-col  justify-between gap-5 ">
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Receiver's Account Name:</div>
                    <div className="capitalize text-base font-bold">{receipt.acc_name}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Receiver's Bank Name:</div>
                    <div className="capitalize text-base font-bold">{receipt.bank_name}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Receiver's Account Name:</div>
                    <div className="capitalize text-base font-bold">{receipt.acc_name}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Swift Code:</div>
                    <div className="capitalize text-base font-bold">{receipt.swift}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Amount:</div>
                    <div className="capitalize text-base font-bold">{currency}{receipt.amount}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Memo:</div>
                    <div className="capitalize text-base font-bold">{receipt.memo}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Transaction Status:</div>
                    <div className="capitalize text-base font-bold">{receipt.status}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Transaction ID:</div>
                    <div className="capitalize text-base font-bold">{receipt.transid}</div>
                  </div>
                  <div className="flex items-center gap-3  w-full">
                    <div className="-500 text-base">Transaction Date:</div>
                    <div className="capitalize text-base font-bold">{moment(receipt.createdAt).format(`DD-MM-YYYY hh:mm A`)}</div>
                  </div>

                </div>
              </div>
            </div>
            <button onClick={() => setScreen(1)} className='mt-6 text-center bg-gradient-to-tr from-primary to-purple-700 text-white w-10/12 mx-auto px-3 py-2 rounded-md'>Close</button>
          </div>
        }

      </div>
    </div>
  )
}

export default Transfer