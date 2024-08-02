import { Progress } from 'antd'
import UserLayout from 'layouts/UserLayout'
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaMinus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Currency, errorMessage, successMessage } from 'utils/functions'
import { BiSupport } from "react-icons/bi";
import { MdAddAPhoto } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import Formbutton from 'utils/Formbutton'
import { IoIosMailUnread } from 'react-icons/io'
import CardComponent from 'components/user/CardComponent'

const Savings = () => {

    const [support, setSupport] = useState(false)
    const proofDiv = useRef(null)
    const [load, setLoad] = useState(false)
    const [add, setAdd] = useState(false)
    const steps = [
        {
            step: 'Contact customer support',
            img: <BiSupport />
        },
        {
            step: 'Upload a Photo of your transaction',
            img: <MdAddAPhoto />
        },
        {
            step: 'Wait for admin to credit your account',
            img: <MdOutlineAvTimer />
        },
    ]

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
    }

    useEffect(() => {
        if (proofDiv) {
            window.addEventListener('click', e => {
                if (proofDiv.current !== null && !proofDiv.current.contains(e.target)) {
                    setSupport(false)
                }
            }, true)
        }
    }, [])

    const submitForm = (e) => {
        e.preventDefault()
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
            setSupport(false)
            successMessage('Transaction submitted')
        }, 4000)
    }

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
            ]
        }
    ]

    return (
        <div className={`w-11/12 relative mx-auto ${add && 'overflow-hidden'}`}>
            {support &&
                <div className="w-full z-50 h-screen absolute flex items-center justify-center rounded-md bg-black/40 backdrop-blur-sm ">

                    <div ref={proofDiv} className={`lg:w-3/4 w-11/12 mx-auto rounded-lg bg-white  py-6 px-3 ${proofimg.img ? 'h-fit' : "h-80"}`}>
                        <div className="w-full">
                            <form onSubmit={submitForm} className="lg:w-3/4 w-full mx-auto">
                                <div className="text-lg font-semibold text-primary">Bank Details to make your transfer to:</div>
                                <div className="w-full flex items-start flex-col mt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold lg:text-xl">Bank Name:</div>
                                        <div className="md:text-xl">Barclays</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold lg:text-xl">Bank Acount No.:</div>
                                        <div className="md:text-xl">0935474883774</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold lg:text-xl">Sort Code:</div>
                                        <div className="md:text-xl">07478374838</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold lg:text-xl">Route No:</div>
                                        <div className="md:text-xl">374763</div>
                                    </div>
                                </div>
                                <div className="mt-3 relative w-fit ml-auto">
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
                                    <div className="w-full mt-5">
                                        <Formbutton label={'Submit'} loading={load && true} />
                                    </div>

                                }
                            </form>
                        </div>

                    </div>
                </div>
            }

            <div className="mt-4 flex flex-col lg:flex-row items-start h-fit py-5 mb-10 gap-10 ">
                <div className="md:w-1/2 w-full h-full py-2 flex items-center justify-center flex-col px-3 rounded-lg bg-white cursor-pointer">
                    <div className="text-lg font-semibold">Three important steps to take and complete your deposit</div>
                    {steps.map((ele, i) => (
                        <ul className='w-full self-center flex items-center  gap-2 py-2 '>
                            <li className='text-2xl'>{ele.img}</li>
                            <li>{ele.step}</li>

                        </ul>
                    ))}
                </div>
                <div onClick={() => setSupport(true)} className="w-fit cursor-pointer self-center text-white px-5 py-2 rounded-lg bg-primary">Contact Support</div>
            </div>

            <div className="w-full grid md:grid-cols-2 grid-cols-1 ">
                <div className="w-full flex items-start flex-col gap-2">
                    <div className="text-xl font-semibold">This Month's Savings</div>
                    {new Array(1).fill(0).map((item, index) => (
                        <div key={index} className="flex gap-2 justify-center items-center">
                            <Progress
                                type="dashboard"
                                steps={8}
                                percent={82.5}
                                strokeColor="#003087"
                                trailColor="rgba(0, 0, 0, 0.06)"
                                strokeWidth={20} />
                            <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                <div className="border-b py-1 text-zinc-500 text-right"> Reason for starting up a savings goal tracker </div>
                                <div className="border-b py-1">
                                    <div className=" text-right">Savings Goal</div>
                                    <div className="font-bold text-right text-primary">{Currency}300,000</div>
                                </div>
                                <div className="border-b py-1">
                                    <div className=" text-right">Current Saved</div>
                                    <div className="font-bold text-right text-primary">{Currency}150,000</div>
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
                <div className="w-full flex items-start flex-col gap-2">
                    <div className="text-xl font-semibold">Last Month's Savings</div>
                    {new Array(1).fill(0).map((item, index) => (
                        <div key={index} className="flex gap-2 justify-center items-center">
                            <Progress
                                type="dashboard"
                                steps={8}
                                percent={82.5}
                                strokeColor="#003087"
                                trailColor="rgba(0, 0, 0, 0.06)"
                                strokeWidth={20} />
                            <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                <div className="border-b py-1 text-zinc-500 text-right"> Reason for starting up a savings goal tracker </div>
                                <div className="border-b py-1">
                                    <div className=" text-right">Savings Goal</div>
                                    <div className="font-bold text-right text-primary">{Currency}300,000</div>
                                </div>
                                <div className="border-b py-1">
                                    <div className=" text-right">Current Saved</div>
                                    <div className="font-bold text-right text-primary">{Currency}150,000</div>
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

               <div className="my-10">
                <CardComponent setAdd={setAdd} add={add}/>
               </div>

            {TransData.map((item, index) => (
                <div className="rounded-xl mb-5  bg-white shadow-md border" key={index}>
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
    )
}

export default Savings