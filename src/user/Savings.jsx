import { Progress } from 'antd'
import UserLayout from 'layouts/UserLayout'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaMinus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Currency, errorMessage, successMessage } from 'utils/functions'
import { BiSupport } from "react-icons/bi";
import { MdAddAPhoto } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import Formbutton from 'utils/Formbutton'
import { IoIosMailUnread } from 'react-icons/io'
import CardComponent from 'components/user/CardComponent'
import { Apis, GetApi, PostApi } from 'services/Api'
import { useSelector } from 'react-redux'
import ModalLayout from 'utils/ModalLayout'
import FormComponent from 'utils/FormComponent'
import ButtonComponent from 'utils/ButtonComponent'
import Loader from 'utils/Loader'

const Savings = () => {

    const [support, setSupport] = useState(false)
    const proofDiv = useRef(null)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [load3, setLoad3] = useState(false)
    const [savings, setSavings] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [closeview, setCloseView] = useState(false)
    const [add, setAdd] = useState(false)
    const [topup, setTopup] = useState(false)
    const [createsave, setCreateSave] = useState(false)

    const profile = useSelector((state) => state.profile.profile)
    const currency = useSelector((state) => state.profile.currency)



    const fetchUserSavings = useCallback(async () => {
        if (!profile) return;
        try {
            const response = await GetApi(Apis.auth.user_savings)
            if (response.status === 200) {
                setSavings(response.data)
            } else {
                // console.log(response)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }, [profile])

    useEffect(() => {
        fetchUserSavings()
    }, [profile])

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


    const [saveForms, setSaveForms] = useState({
        name: '',
        goal: '',
        current: ''
    })


    const handleChange = (e) => {
        setSaveForms({
            ...saveForms,
            [e.target.name]: e.target.value
        })
    }

    const createSavings = async (e) => {
        e.preventDefault()
        if (!saveForms.name) return errorMessage('Savings name is required')
        if (!saveForms.goal) return errorMessage('Savings goal is required')
        if (saveForms.current < 0 || saveForms.current === 0) return errorMessage(`Amount can not be negative or zero`)
        if (saveForms.current > profile?.balance) return errorMessage(`Insufficient balance`)
        const formdata = {
            goal: saveForms.goal,
            name: saveForms.name,
            current: saveForms.current
        }
        setLoad3(true)
        try {
            const response = await PostApi(Apis.auth.create_savings, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setSaveForms({ ...saveForms, goal: '', name: '', current: '' })
                setCreateSave(false)
                fetchUserSavings()
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad3(false)
        }
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

    const selectItem = (items) => {
        setSelectedItem(items)
    }

    const [forms, setForms] = useState({
        id: selectedItem.id,
        amount: ''
    })

    const topUpSavings = async (e) => {
        e.preventDefault()

        if (forms.amount < 0) return errorMessage(`Amount can not be negative`)
        const formdata = {
            id: selectedItem.id,
            amount: forms.amount
        }
        // return  console.log(formdata)
        setLoad2(true)
        try {
            const response = await PostApi(Apis.auth.topup, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setCloseView(false)
                setForms({ ...forms, id: '', amount: '' })
                fetchUserSavings()
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        } finally {
            setLoad2(false)

        }
    }


    const deletsavings = async (e) => {
        e.preventDefault()
        const formdata = {
            id: selectedItem.id
        }
        setLoad2(true)
        try {
           const response = await PostApi(Apis.auth.delete_savings,formdata)
           if(response.status === 200){
            successMessage(response.msg)
            setCloseView(false)
            setForms({ ...forms, id: '', amount: '' })
            fetchUserSavings()
           }else{
            console.log(response)
           }
        } catch (error) {
           errorMessage(error.message)
        } finally {
            setLoad2(false)
        }
    }
    return (
        <div className={`w-11/12  mx-auto ${add && 'overflow-hidden'}`}>

            {createsave &&
                <ModalLayout setModal={setCreateSave} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <form onSubmit={createSavings} className="h-fit w-full relative bg-white rounded-lg p-10">

                        {load3 &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                                <Loader />
                            </div>
                        }
                        <div className="w-full flex items-start gap-5 flex-col ">
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="lg:w-[45%]">Savings Goal Name</div>
                                <FormComponent name={'name'} value={saveForms.name} onchange={handleChange} />
                            </div>
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="lg:w-[45%]">Goal</div>
                                <FormComponent formtype='phone' name={'goal'} value={saveForms.goal} onchange={handleChange} />
                            </div>
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="flex items-start lg:w-[45%]   flex-col">
                                    <div className="w-full">Amount to add </div>
                                    <div>Available bal. {currency}{profile?.balance}</div>
                                </div>
                                <FormComponent formtype='phone' name={'current'} value={saveForms.current} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="lg:w-1/2 mx-auto mt-8">
                            <ButtonComponent title={`Create Savings`} bg={`text-white bg-primary h-14 `} />
                        </div>
                    </form>
                </ModalLayout>
            }

            {support &&
                <ModalLayout setModal={setSupport} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <div ref={proofDiv} className={`w-full p-10 rounded-lg bg-white h-fit `}>
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
                </ModalLayout>
            }

            {closeview &&
                <ModalLayout setModal={setCloseView} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <div className="w-full bg-white h-fit p-10 rounded-lg ">


                        {load2 &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                                <Loader />
                            </div>
                        }
                        <div className="grid grid-cols-1 ">
                            <div className="flex gap-2 justify-center items-center">
                                <Progress
                                    type="dashboard"
                                    steps={5}
                                    percent={selectedItem.percent}
                                    strokeColor="#003087"
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20} className='text-sm' />
                                <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                    {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                    <div className="border-b py-1 text-zinc-500 text-right">Savings name: <span className='text-xl font-bold text-primary capitalize'>{selectedItem.name}</span></div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Savings Goal</div>
                                        <div className="font-bold text-right text-primary">{currency}{selectedItem.goal}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Current Saved</div>
                                        <div className="font-bold text-right text-primary">{currency}{selectedItem.current}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Last Saved</div>
                                        <div className="font-bold text-right text-primary">{selectedItem.lastsaved} </div>
                                    </div>
                                    <div onClick={() => setCloseView(false)} className="py-1 flex justify-end cursor-pointer">
                                        <div className='flex text-blue-600 items-center justify-end gap-2'>Close <FaArrowLeft /> </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={topUpSavings} className="mt-5 w-full flex flex-col md:flex-row items-center gap-4 justify-between">
                            <button type='button' onClick={() => setTopup(prev => !prev)} className='font-bold w-fit px-4 py-2 underline text-primary'>{topup ? 'Close' : 'TopUp Savings'}</button>
                            {topup && <div className="flex items-center flex-col gap-1">
                                <div className="flex flex-col items-start">
                                    <div className="">Available Balance <span>{currency}{profile?.balance}</span></div>
                                    <FormComponent name={`amount`} value={forms.amount} onchange={(e) => setForms({ ...forms, [e.target.name]: e.target.value })} formtype='phone' />
                                </div>
                                <ButtonComponent title={`Top Up`} bg={`bg-primary mt-2 text-white text-white h-10`} />
                            </div>}
                        </form>
                        {!topup && <div className="mt-3 w-11/12 mx-auto">
                            <ButtonComponent onclick={deletsavings} type='button' title={`Delete Savings`} bg={`bg-red-600   text-white h-10`} />
                        </div>}
                    </div>
                </ModalLayout>
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

            <div onClick={() => setCreateSave(true)} className=" mb-3 cursor-pointer w-fit ml-auto text-white bg-primary  px-5 py-2 rounded-md">Add New Goal</div>
            <div className={`grid grid-cols-1 ${savings.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-5 lg:gap-10`}>

                {savings.length > 0 ? savings.map((item, index) => (
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
                                <div className="font-bold text-right text-primary">{currency}{item.goal}</div>
                            </div>
                            <div className="border-b py-1">
                                <div className=" text-right">Current Saved</div>
                                <div className="font-bold text-right text-primary">{currency}{item.current}</div>
                            </div>
                            <div className="border-b py-1">
                                <div className=" text-right">Last Saved</div>
                                <div className="font-bold text-right text-primary">{item.lastsaved} </div>
                            </div>
                            <Link onClick={() => setCloseView(true)} onMouseOver={() => selectItem(item)} className="py-1 flex justify-end cursor-pointer">
                                <div className='flex text-blue-600 items-center justify-end gap-2'>More <FaArrowRight /> </div>
                            </Link>
                        </div>
                    </div>
                )) :

                    <div className="mt-5 text-left text-2xl font-bold">No savings found...</div>

                }
            </div>

            <div className="my-10">
                <CardComponent setAdd={setAdd} add={add} />
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