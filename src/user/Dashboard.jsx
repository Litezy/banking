import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsBell } from 'react-icons/bs'
import { AiOutlineScan } from 'react-icons/ai'
import { TbHeadset } from 'react-icons/tb'
import { IoIosMailUnread } from 'react-icons/io'
import { FaArrowRight, FaMinus } from 'react-icons/fa6'
import { Progress } from 'antd'
import { Currency, errorMessage } from 'utils/functions'
import { GoShieldLock } from 'react-icons/go'
import { IoCopy, IoEyeOutline } from 'react-icons/io5'
import img1 from 'assets/img1.png'
import img2 from 'assets/img2.png'
import img3 from 'assets/img3.png'
import Imaged from 'utils/Imaged'
import { Apis, GetApi } from 'services/Api'
import { useDispatch } from 'react-redux'
import { dispatchCurrency, dispatchProfile } from 'app/reducer'
import axios from 'axios'

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
    { img: img1, url: '', title: 'Transfer' },
    { img: img3, url: '', title: 'Savings' },
]

export default function Dashboard() {

    const dispatch = useDispatch()
    const [profile, setProfile] = useState({})
    const [shortName,setShortName] = useState('')
    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile)
            if (response.status === 200) {
                setProfile(response.data)
                dispatch(dispatchProfile(response.data))
                // console.log(response.data?.country)
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }
    )


    useEffect(() => {
        fetchUserProfile()
    }, [])


    const [currency, setCurrency] = useState()
    const fetchCurrency = useCallback(
        async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${profile?.country}`);
                console.log(response)
                if (response.data && response.data.length > 0) {
                    const countryData = response.data[0];
                    const currencySymbol = Object.values(countryData.currencies)[0].symbol;
                    setCurrency(currencySymbol);
                    dispatch(dispatchCurrency(currencySymbol))
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching currency:', error);
            }
        }
    )
    useEffect(() => {
        fetchCurrency()
    }, [])

    return (
        <div>
            <div className="w-11/12 mx-auto">
                <div className="flex items-center gap-5 justify-between mt-7">
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-2.5 rounded-full text-white bg-gradient-to-tr from-primary to-purple-700 w-fit h-fit">{shortName}</div>
                        <div className="">
                            <div className="flex items-center gap-2">
                                <div className="">Hi,</div>
                                <div className="font-semibold text-lg">{profile?.firstname} {profile?.lastname}</div>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm"> {profile?.account_number} <IoCopy className='text-primary' /> </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="text-2xl flex items-center justify-end gap-5">
                            <Link to="">
                                <TbHeadset />
                            </Link>
                            <Link to="">
                                <AiOutlineScan />
                            </Link>
                            <Link to="/user/notifications" className='relative'>
                                <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white absolute top-0 right-0 shadow-lg"></div>
                                <BsBell />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-7 items-center">
                    <div className="bg-gradient-to-tr from-primary to-purple-700 px-6 py-10 rounded-lg">
                        <div className="flex items-center gap-2 text-white text-sm font-extralight">
                            <GoShieldLock className='text-green-400 text-base' />
                            <div className="">Available Balance</div>
                            <IoEyeOutline />
                        </div>
                        <div className="flex mt-5 items-start">
                            <div className="text-slate-200 lg:text-4xl text-2xl self-end font-bold">{currency}</div>
                            <div className="font-bold text-4xl text-white">{profile?.balance}</div>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="grid grid-cols-2">
                                {DashboardOptions.map((item, index) => (
                                    <Link to={item.url} key={index}>
                                        <div className="flex items-center gap-4 flex-col">
                                            <Imaged src={item.img} alt="" className={
                                                index === 1 ? 'w-12 h-12 scale-125' : 'w-9 h-9'
                                            } />
                                            <div className="font-extralight text-xs lg:text-sm">{item.title}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-3 mt-7 border">
                    <div className="flex items-center justify-between my-6">
                        <div className="font-semibold text-2xl lg:text-3xl">Latest Savings Goal</div>
                        <div className="">
                            <Link to="/user/savings" className='text-blue-600'>View all</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
                        {new Array(3).fill(0).map((item, index) => (
                            <div key={index} className="flex gap-2 justify-center items-center">
                                <Progress
                                    type="dashboard"
                                    steps={4}
                                    percent={82.5}
                                    strokeColor="#003087"
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20} />
                                <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                    {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                    <div className="border-b py-1 text-zinc-500 text-right"> Reason for starting up a savings goal tracker </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Savings Goal</div>
                                        <div className="font-bold text-right text-primary">{currency}300,000</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Current Saved</div>
                                        <div className="font-bold text-right text-primary">{currency}150,000</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Last Saved</div>
                                        <div className="font-bold text-right text-primary">3 Dec 2021 6:20 pm </div>
                                    </div>
                                    <div className="py-1 flex justify-end">
                                        <Link to={`/user/savings/${3}`} className='flex text-blue-600 items-center justify-end gap-2'>More <FaArrowRight /> </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between my-6">
                    <div className="font-semibold text-2xl lg:text-3xl">Latest Transactions</div>
                    <div className="">
                        <Link to="/user/transactions" className='text-blue-600'>View all</Link>
                    </div>
                </div>

                {TransData.map((item, index) => (
                    <div className="rounded-xl mb-5 bg-white shadow-md border" key={index}>
                        <div className="p-3"> {item.title}</div>
                        <div className="flex flex-col">
                            {item.data.map((ele, i) => (
                                <div
                                    // onClick={() => setViews({status: true, data: ele})}
                                    key={i} className="p-3 border-b last:border-none cursor-pointer">
                                    <div className="grid grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full p-1 bg-blue-300 text-blue-50">
                                                <div className="bg-blue-400 rounded-full p-1">
                                                    <IoIosMailUnread className='text-xl' />
                                                </div>
                                            </div>
                                            <div className="text-sm font-bold">{ele.title}</div>
                                            <FaMinus className='text-slate-500' />
                                            <div className={`text-xs font-semibold ${ele.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{ele.status}</div>
                                        </div>
                                        <div className="">
                                            <div className={`text-base font-bold text-right ${ele.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{ele.status === "Success" ? '+' : '-'}{Currency}{parseInt(ele.amount).toLocaleString()}</div>
                                            <div className="text-xs text-right">{ele.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-500">{ele.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
