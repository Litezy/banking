import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsBell } from 'react-icons/bs'
import { AiOutlineScan } from 'react-icons/ai'
import { TbHeadset } from 'react-icons/tb'
import { IoIosMailUnread } from 'react-icons/io'
import { FaArrowLeft, FaArrowRight, FaMinus, FaUser } from 'react-icons/fa6'
import { Progress } from 'antd'
import { Currency, errorMessage, successMessage } from 'utils/functions'
import { GoShieldLock } from 'react-icons/go'
import { IoCopy, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import img1 from 'assets/img1.png'
import img2 from 'assets/img2.png'
import img3 from 'assets/img3.png'
import Imaged from 'utils/Imaged'
import { Apis, GetApi, profileImg } from 'services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchCurrency, dispatchProfile, dispatchUserSavings } from 'app/reducer'
import axios from 'axios'
import ModalLayout from 'utils/ModalLayout'
import VerifyEmailAccount from 'forms/VerifyEmail'
import CardComponent from 'components/user/CardComponent'
import { FaAsterisk } from 'react-icons/fa'

const TransData = [
    {
        title: 'Today',
        data: [
            {
                title: 'Withdrawal',
                amount: '1200',
                content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
                status: 'Success',
                date: '12:00 PM'
            },
            {
                title: 'Deposit',
                amount: '1,000',
                status: 'Failed',
                content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
                date: '11:00 PM'
            },
            {
                title: 'Transfer',
                amount: '500',
                content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
                status: 'Success',
                date: '10:00 PM'
            },
            {
                title: 'Transfer',
                amount: '700',
                content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
                status: 'Failed',
                date: '9:00 PM'
            }
        ]
    },
]


const DashboardOptions = [
    { img: img1, url: '/user/transfer', title: 'Transfer' },
    { img: img3, url: '/user/savings', title: 'Savings' },
]

export default function Dashboard() {

    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const currency = useSelector((state) => state.profile.currency)
    const [userSavings, setUserSavings] = useState([])
    const navigate = useNavigate()
    const [records, setRecords] = useState([])
    const [selectSaving, setSelectSaving] = useState({})
    const [viewMore, setViewMore] = useState(false)
    const [show, setShow] = useState(true)
    const Icon = show ? IoEyeOutline : IoEyeOffOutline


    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile);
            // console.log(response)
            if (response.status === 200) {
                setProfile(response.data);
                dispatch(dispatchProfile(response.data));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    }, [dispatch]);



    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);



    const fetchUserSavings = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.user_savings)
            if (response.status !== 200) return;
            setUserSavings(response.data)
            dispatch(dispatchUserSavings(response.data))
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])

    const deposit = 'Deposit'
    const withdraw = 'Withdraw'

    const fetchTransHistory = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.trans_history)
            if (response.status === 200) {
                setRecords(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])
    useEffect(() => {
        fetchTransHistory()
    }, [profile, dispatch])


    const selectOne = (item) => {
        setSelectSaving(item)
    }

    const copyToClip = async () => {
        try {
            await navigator.clipboard.writeText(profile?.account_number);
            successMessage('account number copied!');
        } catch (err) {
            errorMessage('Failed to copy!');
        }
    };
    const transferin = 'Internal Transfer In'
    const transferout = 'Internal Transfer Out'
    return (
        <div>
            <div className="w-11/12 mx-auto">
                {viewMore &&
                    <ModalLayout setModal={setViewMore} clas={`lg:w-fit w-11/12 mx-auto`}>
                        <div className="w-full bg-white h-fit p-10 rounded-lg ">
                            <div className="grid grid-cols-1 ">
                                <div className="flex gap-2 justify-center items-center">
                                    <Progress
                                        type="dashboard"
                                        steps={5}
                                        percent={selectSaving.percent}
                                        strokeColor="#003087"
                                        trailColor="rgba(0, 0, 0, 0.06)"
                                        strokeWidth={20} />
                                    <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                        {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                        <div className="border-b py-1 text-zinc-500 text-right">Savings name: <span className='text-xl font-bold text-primary capitalize'>{selectSaving.name}</span></div>
                                        <div className="border-b py-1">
                                            <div className=" text-right">Savings Goal</div>
                                            <div className="font-bold text-right text-primary">{currency}{selectSaving.goal.toLocaleString()}</div>
                                        </div>
                                        <div className="border-b py-1">
                                            <div className=" text-right">Currently Saved</div>
                                            <div className="font-bold text-right text-primary">{currency}{selectSaving.current.toLocaleString()}</div>
                                        </div>
                                        <div className="border-b py-1">
                                            <div className=" text-right">Last Saved</div>
                                            <div className="font-bold text-right text-primary">{selectSaving.lastsaved} </div>
                                        </div>
                                        <div onClick={() => setViewMore(false)} className="py-1 flex justify-end cursor-pointer">
                                            <div className='flex text-blue-600 items-center justify-end gap-2'>Close <FaArrowLeft /> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalLayout>
                }



                <div className="flex flex-col lg:flex-row w-full gap-10 mt-8 items-center">
                    <div className="bg-gradient-to-tr lg:w-[65%] px-3 w-full from-primary to-purple-700  lg:py-10 py-5  rounded-lg flex items-center justify-center flex-col">
                        <div className="flex items-center flex-col gap-2 ">
                            <div className="flex items-center gap-3 text-white text-sm font-extralight">
                                <GoShieldLock className='text-green-400 text-xl ' />
                                <div className="text-base">Available Balance</div>
                                <Icon onClick={() => setShow(prev => !prev)} className='text-xl cursor-pointer' />
                            </div>
                            <div className="flex  items-start">
                                <div className="text-slate-200 lg:text-4xl text-3xl  font-bold">{currency}</div>
                                <div className="font-bold lg:text-4xl text-3xl text-white">{show ? profile?.balance?.toLocaleString() :
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
                        <div className="flex items-center  gap-5 text-white my-3">
                            <div className="flex items-start flex-col">
                                <div className=" text-sm">Account Name:</div>
                                <div className="font-semibold capitalize text-lg">{profile?.firstname} {profile?.lastname}</div>
                            </div>
                            <div className="flex items-start flex-col">
                                <div className=" text-sm">Account Number:</div>
                                <div onClick={copyToClip} className="flex  items-center font-semibold gap-2  text-lg"> {profile?.account_number} <IoCopy className='text-sky-200 text-lg cursor-pointer' /> </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[35%] w-full">
                        <div className="bg-white py-10 rounded-lg shadow-lg">
                            <div className="grid grid-cols-2">
                                {DashboardOptions.map((item, index) => (
                                    <Link to={item.url} key={index}>
                                        <div className="flex items-center gap-4 flex-col">
                                            <Imaged src={item.img} alt="" className={
                                                index === 1 ? 'w-12 h-12 scale-122' : 'w-9 h-12'
                                            } />
                                            <div className="font-extralight text-xs lg:text-sm">{item.title}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-5 ">
                    <CardComponent />
                </div>

                <div className="bg-white rounded-xl p-3 mt-7  w-full">
                    <div className="flex items-center justify-between my-6">
                        <div className="font-semibold text-2xl lg:text-3xl">Latest Savings Goal</div>
                        <div className="">
                            <Link to="/user/savings" className='text-blue-600'>View all</Link>
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 ${userSavings.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-5 lg:gap-10`}>
                        {userSavings.length > 0 ? userSavings.map((item, index) => (
                            <div key={index} className="flex gap-2 justify-center items-center">
                                <Progress
                                    type="dashboard"
                                    steps={5}
                                    percent={item.percent}
                                    strokeColor="#003087"
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20} />
                                <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                    {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                    <div className="border-b py-1 text-zinc-500 text-right"> Savings name: <span className='text-xl font-bold capitalize text-primary'>{item.name}</span> </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Savings Goal</div>
                                        <div className="font-bold text-right text-primary">{currency}{item.goal?.toLocaleString()}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Currently Saved</div>
                                        <div className="font-bold text-right text-primary">{currency}{item.current?.toLocaleString()}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Last Saved</div>
                                        <div className="font-bold text-right text-primary">{item.lastsaved} </div>
                                    </div>
                                    <div onClick={() => setViewMore(true)} onMouseOver={() => selectOne(item)} className="py-1 flex justify-end cursor-pointer">
                                        <div className='flex text-blue-600 items-center justify-end gap-2'>More <FaArrowRight /> </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                            <div className="flex items-center b flex-col lg:flex-row gap-10 w-full">
                                {new Array(2).fill(0).map((ite, i) => (
                                    <div className="flex gap-2  justify-center items-center w-full" key={i}>
                                        <Progress
                                            type="dashboard"
                                            steps={5}
                                            percent={0}
                                            strokeColor="#003087"
                                            trailColor="rgba(0, 0, 0, 0.06)"
                                            strokeWidth={20} />
                                        <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                            {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                            <div className="border-b py-1 text-zinc-500 text-right"> Savings name: <span className='text-xl font-bold capitalize text-primary'>Nil</span> </div>
                                            <div className="border-b py-1">
                                                <div className=" text-right">Savings Goal</div>
                                                <div className="font-bold text-right text-primary">Nil</div>
                                            </div>
                                            <div className="border-b py-1">
                                                <div className=" text-right">Currently Saved</div>
                                                <div className="font-bold text-right text-primary">Nil</div>
                                            </div>
                                            <div className="border-b py-1">
                                                <div className=" text-right">Last Saved</div>
                                                <div className="font-bold text-right text-primary">Nil </div>
                                            </div>
                                            {/* <Link className="py-1 flex justify-end cursor-pointer">
                        <div className='flex text-blue-600 items-center justify-end gap-2'>More <FaArrowRight /> </div>
                    </Link> */}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        }
                    </div>
                </div>
                <div className="flex items-center justify-between my-6">
                    <div className="font-semibold text-2xl lg:text-3xl">Latest Transactions</div>
                    <div className="">
                        <Link to="/user/transactions" className='text-blue-600'>View all</Link>
                    </div>
                </div>

                <div className="mt-5 w-full bg-white shadow-md ">
                    {records.length > 0 ? records.slice(0, 4).map((item, index) => (
                        <div className="rounded-xl mb-2 border-b last:border-none" key={index}>
                            {/* <div className="p-3 border"> {item.title}</div> */}
                            <div className="flex flex-col">
                                <div className="p-3 border-b last:border-none cursor-pointer">
                                    <div className="grid grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full p-1 bg-blue-300 text-blue-50">
                                                <div className="bg-blue-400 rounded-full p-1">
                                                    <IoIosMailUnread className='text-xl' />
                                                </div>
                                            </div>
                                            <div className="text-sm lg:text-base font-bold">{item.type}</div>
                                            <FaMinus className='text-slate-500 hidden lg:block' />
                                            <div className={`text-xs font-semibold hidden lg:block ${item.status === 'success' ? 'text-green-600' : item.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`}>{item.status}</div>
                                        </div>
                                        <div className="">
                                            <div className={`text-base font-bold text-right 
                        ${item.type === deposit && item.status === 'pending' ? 'text-yellow-500' :
                                                    item.type === deposit && item.status === 'success' ? 'text-green-600' :
                                                        item.type === transferin && item.status === 'success' ? 'text-green-600' : "text-red-600"
                                                }`}>

                                                {item.type === deposit && item.status === 'success' ? '+' :
                                                    item.type === deposit && item.status === 'pending' ? '' :
                                                        item.type === transferin && item.status === 'success' ? '+' : '-'}{currency}{parseInt(item.amount).toLocaleString()}
                                            </div>
                                            <div className="text-xs text-right">{item.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-500">{item.message}</div>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className="text-xl p-5">No Transactions data</div>

                    }
                </div>
            </div>
        </div>
    )
}
