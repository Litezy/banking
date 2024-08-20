import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Apis, GetApi, PostApi, profileImg } from 'services/Api'
import ButtonComponent from 'utils/ButtonComponent'
import FormComponent from 'utils/FormComponent'
import { errorMessage, successMessage } from 'utils/functions'
import Loader from 'utils/Loader'
import ModalLayout from 'utils/ModalLayout'
import Summary from './Summary'

const UserVerifications = ({ }) => {

    const { id } = useParams()
    const [show, setShow] = useState({ status: false, id: null })
    const [viewimage, setViewImage] = useState({ status: false, image: null })
    const [selectedItem, setSelectedItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [load3, setLoad3] = useState(false)
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({})
    const decodedId = decodeURIComponent(id);
    const navigate = useNavigate()


    const fetchVerifications = useCallback(async () => {
        setLoad(true)
        try {
            const res = await GetApi(`${Apis.admin.single_trans}/${decodedId}`)
            if (res.status === 200) {
                setData(res.data)
            } else {
                console.log(res.msg)
            }
        } catch (error) {
            console.log(error)
            errorMessage(`sorry, error in fetching transfers`, error)
        } finally {
            setLoad(false)
        }
    })

    useEffect(() => {
        fetchVerifications()
    }, [])
    // console.log(`${Apis.admin.single_trans}/${decodedId}`)
    const [form, setForm] = useState({
        amount: '',
        message: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const sendOtp = async (id) => {
        if (!data?.usertransfers?.email) return errorMessage(`Email is missing`)
        if (!id) return errorMessage(`Verification ID is missing`)
        const formdata = {
            email: data?.usertransfers?.email,
            id: id
        }
        setLoading(true)
        try {
            const res = await PostApi(Apis.admin.otp, formdata)
            if (res.status === 200) {
                successMessage(res.msg)
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

    // console.log(data)
    const createVerify = async (e) => {
        e.preventDefault()
        if (!data.id) return errorMessage(`Transfer ID missing`)
        if (!form.amount) return errorMessage(`Transfer amount missing`)
        if (!form.message) return errorMessage(`Transfer message missing`)
        const formdata = {
            id: data?.id,
            amount: form.amount,
            message: form.message
        }
        setLoading(true)
        try {
            const res = await PostApi(Apis.admin.create_verify, formdata)
            if (res.status === 200) {
                successMessage(res.msg)
                setModal(false)
                setForm({
                    ...form,
                    amount: '',
                    message: ''
                })
                fetchVerifications()
            } else {
                errorMessage(res.msg)
                setForm({
                    ...form,
                    amount: '',
                    message: ''
                })
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }

    }



    const completeTransfer = async () => {
        if (!show.id) return errorMessage(`ID is missing`)
        const formdata = {
            id: show.id
        }
        setLoad3(true)
        try {
            const res = await PostApi(Apis.admin.confirm_trans, formdata)
            if (res.status !== 200) return errorMessage(res.msg)
            successMessage(res.msg)
            CloseShow()
            fetchVerifications()
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad3(false)
        }
    }

    const CloseShow = () => {
        setShow({ status: false, id: null })
    }
    return (

        <div className="w-11/12 mx-auto mt-10">
            <div onClick={() => navigate('/admin/verifications')} className="rounded-md w-fit mr-auto px-4 py-1 bg-primary text-white cursor-pointer">back</div>
            <div className="w-full flex items-center justify-between">
                <div className="w-2/4 mx-auto">
                    <Summary color='bg-zinc-500 text-white' title={'Total Verifications'} data={data?.verifications?.length} />
                </div>
            </div>

            {load &&
                <div className="absolute top-1/3 z-50 left-1/2 -translate-x-1/2  ">
                    <Loader />
                </div>
            }
            {modal &&
                <ModalLayout setModal={setModal} clas={`w-11/12 mx-auto lg:w-[60%]`}>
                    <form onSubmit={createVerify} className="w-full bg-white p-10 rounded-md relative">

                        {loading &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
                                <Loader />
                            </div>
                        }
                        <div className="flex items-start flex-col gap-5 w-full">
                            <div className="flex items-center gap-5 lg:w-1/2 w-full">
                                <div className="">Amount ({data?.usertransfers?.currency}):</div>
                                <FormComponent formtype='phone' onchange={handleChange} name={`amount`} value={form.amount} placeholder={'amount'} />
                            </div>
                            <div className="flex items-center gap-5 w-full">
                                <div className="">Message:</div>
                                <textarea
                                    name="message"
                                    className='w-full min-h-20 border outline-none p-2 rounded-md'
                                    value={form.message}
                                    placeholder='message'
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="w-11/12 lg:w-1/2 mx-auto mt-10">
                            <ButtonComponent disabled={loading ? true : false} title={`Send message`} bg={`bg-primary h-14 text-white`} />
                        </div>
                    </form>

                </ModalLayout>
            }
            {viewimage.status &&
                <ModalLayout setModal={() => setViewImage({ status: false, image: null })} clas={`w-11/12 mx-auto lg:w-[60%]`}>
                    <div className="w-full bg-white p-10 rounded-md relative">
                        <div className="text-xl font-bold text-center mb-3">Payment Proof</div>
                        <div className="">
                            <img src={`${profileImg}/transfers/${viewimage.image}`} alt="" />
                        </div>
                    </div>

                </ModalLayout>
            }

            {load2 &&
                <div className="absolute top-1/3 z-50 bg-white rounded-md flex items-center justify-center p-10 left-1/2 -translate-x-1/2  ">
                    <Loader />
                </div>
            }
            {show.status &&
                <ModalLayout setModal={CloseShow} clas={`w-11/12 mx-auto lg:w-[40%]`}>
                    <div className="w-full bg-white p-10 rounded-md relative">

                        {load3 &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
                                <Loader />
                            </div>
                        }
                        <div className="text-xl text-center mb-3">Are you sure you want to confirm?</div>
                        <div className="flex items-center justify-between">
                            <button onClick={CloseShow} className='px-3 w-fit py-2 rounded-md text-white bg-red-500'>cancel</button>
                            <button disabled={load3 ? true : false} onClick={completeTransfer} className='px-3 w-fit py-2 rounded-md text-white bg-green-500'>proceed</button>
                        </div>

                    </div>

                </ModalLayout>
            }
            <div>
                <div className="relative overflow-x-auto rounded-md mt-10">

                    {loading &&
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
                            <Loader />
                        </div>
                    }
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary text-xl text-white">
                            <tr>

                                <th scope="col" className="px-3 py-3">
                                    Amount to pay
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Image Proof
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    verified
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    OTP code
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    complete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.verifications?.length > 0 ? data.verifications.map((item, i) => (
                                <tr className="bg-white border-b " key={i}>

                                    <td className="px-3 py-3">
                                        {data?.usertransfers?.currency}{item.amount}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.image ?
                                            <button onClick={() => setViewImage({ status: true, image: item?.image })} className="bg-zinc-600 text-white px-5 rounded-lg py-2">view</button>
                                            : 'no image uploaded'}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.verified}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.image && <button disabled={loading || item.verified === 'true' ? true : false} onClick={() => sendOtp(item?.id)} className={`text-white ${item.verified === 'true' ? 'bg-slate-200' : "bg-yellow-500"} px-5 rounded-lg py-2`}>send</button>}
                                    </td>
                                    {item.verified === 'true' ? <td className="px-3 py-3">
                                        <button onClick={() => setShow({ status: true, id: item.id })} className="bg-green-500 text-white px-5 rounded-lg py-2">complete</button>
                                    </td> : '--'}
                                </tr>
                            )) :
                                <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                                    <td>No Verifications found for this transfer</td>
                                </tr>
                            }

                        </tbody>
                    </table>


                </div>

                <div className="mt-5 flex items-center justify-center w-full">
                    <button onClick={() => setModal(true)} className='w-fit px-4 py-1 rounded-md text-white bg-primary'>Create verification</button>
                </div>
            </div>
        </div>
    )
}

export default UserVerifications