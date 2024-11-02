import React, { useCallback, useEffect, useState } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { errorMessage, successMessage } from 'utils/functions'
import { FaAsterisk } from "react-icons/fa6";
import FormComponent from 'utils/FormComponent';
import Loader from 'utils/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Apis, GetApi, PostApi } from 'services/Api';
import ButtonComponent from 'utils/ButtonComponent';
import { dispatchProfile } from 'app/reducer';
import Lottie from 'lottie-react';
import animationLogo from "../assets/animation.json"
import PendingLogo from "../assets/Pending.json"
import moment from 'moment';

const Transfer = () => {
  const [bal, setBal] = useState(true)
  const [loading, setLoading] = useState(false)


  const Icon = bal ? IoEyeOffSharp : IoEyeOutline
  const profile = useSelector((state) => state.profile.profile)
  const currency = useSelector((state) => state.profile.currency)
  const [screen, setScreen] = useState(0)
  const [receipt, setReceipt] = useState({})
  const dispatch = useDispatch()
  const [transfer, setTransfer] = useState({})
  

  const [forms, setForms] = useState({
    acc_no: '',
    acc_name: '',
    bank_name: '',
    swift: '',
    amount: '',
    reset_code: '',
    memo: ''
  })
  const [transferCode, setTransferCode] = useState('')

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }


  const fetchUserProfile = useCallback(async () => {
    try {
      // attach any pending transfer of a user that the code has notn yet be provided
      const response = await GetApi(Apis.auth.profile);
      if (response.status !== 200) return;
      dispatch(dispatchProfile(response.data));
      setTransfer(response.transfer)
      if(response.transfer?.id) {
        if(response.transfer?.requireCode === 'yes' && response.transfer?.code === null) {
          return setScreen(4)
        }else if(response.transfer?.requireCode === 'no') {
          return setScreen(3)
        }else {
          return setScreen(1)
        }
      }else {
        return setScreen(1)
      }
    } catch (error) {
      errorMessage(`error in fetching profilee`, error.message);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {fetchUserProfile()}, [fetchUserProfile])


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
        if(res.data.requireCode === 'no') {
          return setScreen(3)
        }
        if(res.data.requireCode === 'yes') {
          return setScreen(4)
        }
      } else {
        errorMessage(res.msg)
      }

    } catch (error) {
      errorMessage(error.mesage)
    } finally {
      setLoading(false)
    }
  }

  const CodeSubmission = async (e) => {
    e.preventDefault()
    if (!transferCode) return errorMessage('Transfer code is required')
    setLoading(true)
    try {
      const formData = {
        transferid: transfer?.id,
        code: transferCode
      }
      const res = await PostApi(Apis.auth.submit_transfer_code, formData)
      if (res.status === 200) {
        successMessage(res.msg)
        setScreen(1)
        fetchUserProfile()
      } else {
        errorMessage(res.msg)
      }

    } catch (error) {
      errorMessage(error.mesage)
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
                <div className="-500 text-base">Amount</div>
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

        {screen === 4 &&
          <div className="my-10 lg:w-[60%] mx-auto w-full relative flex items-center shadow-lg flex-col py-5 px-3 lg:px-10 bg-white rounded-lg h-fit">
            <div className="my-3 text-center text-2xl font-extrabold text-purple-700">Verification code required</div>
            <div className="text-center font-bold text-2xl">{profile.currency} {profile.amount}</div>
            <div className="text-center">{profile.requestMessage}, kindly contact live support for assistance.</div>
            <Lottie
              animationData={PendingLogo}
              className="w-auto h-72"
              loop={true}
            />
            <form onSubmit={CodeSubmission}>
              <div className="flex items-start gap-1 flex-col w-full">
                <div className="">Transfer verification code</div>
                <FormComponent name={`transferCode`} value={transferCode} onchange={e => setTransferCode(e.target.value)} />
              </div>
              <button className='mt-6 text-center bg-gradient-to-tr from-primary to-purple-700 text-white w-full truncate mx-auto px-3 py-2 rounded-md'>Submit Verification code</button>
            </form>
            {screen !== 4 && <button onClick={() => setScreen(1)} className='mt-6 text-center bg-gradient-to-tr from-primary to-purple-700 text-white w-10/12 mx-auto px-3 py-2 rounded-md'>Close</button>}
          </div>
        }

      </div>
    </div>
  )
}

export default Transfer