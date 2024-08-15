import React, { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { Apis, GetApi, PostApi, profileImg } from 'services/Api'
import { errorMessage, successMessage } from 'utils/functions'
import moment from 'moment'
import ModalLayout from 'utils/ModalLayout'
import FormComponent from 'utils/FormComponent'
import ButtonComponent from 'utils/ButtonComponent'
import Loader from 'utils/Loader'

const Verifications = () => {

    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [viewimage, setViewImage] = useState(false)
    const [form, setForm] = useState({
        amount: '',
        message: ''
    })

    const fetchVerifications = useCallback(async () => {
        try {
            const res = await GetApi(Apis.admin.all_transfers)
            if (res.status === 200) {
                setData(res.data)
                console.log(res.data)
            } else {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
            errorMessage(`sorry, error in fetching transfers`, error)
        }
    })

    useEffect(() => {
        fetchVerifications()
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const selectOne = (item) => {
        setSelectedItem(item)
    }

    const createVerify = async (e) => {
        e.preventDefault()
        if (!selectedItem.id) return errorMessage(`Transfer ID missing`)
        if (!form.amount) return errorMessage(`Transfer amount missing`)
        if (!form.message) return errorMessage(`Transfer message missing`)
        const formdata = {
            id: selectedItem.id,
            amount: form.amount,
            message: form.message
        }
        setLoading(true)
        try {
            const res = await PostApi(Apis.admin.create_verify, formdata)
            if (res.status === 200) {
                successMessage(res.msg)
                setModal(false)
                fetchVerifications()
                setForm({
                    ...form,
                    amount: '',
                    message: ''
                })
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
    return (
        <div className='w-11/12 mx-auto'>
            <div className="w-full flex items-center justify-between">
                <div className="w-2/4 mx-auto">
                    <Summary color='bg-zinc-500 text-white' title={'Total Verifications'} data={data?.length} />
                </div>
            </div>


            {modal &&
                <ModalLayout setModal={setModal} clas={`w-11/12 mx-auto lg:w-[60%]`}>
                    <form onSubmit={createVerify} className="w-full bg-white p-10 rounded-md relative">

                        {loading &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
                                <Loader />
                            </div>
                        }
                        <div className="text-xl font-bold text-center mb-3">Create Verification Message</div>
                        <div className="flex items-start flex-col gap-5 w-full">
                            <div className="flex items-center gap-5 lg:w-1/2 w-full">
                                <div className="">Amount ({selectedItem?.usertransfers?.currency}):</div>
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
                            <ButtonComponent title={`Send message`} bg={`bg-primary h-14 text-white`} />
                        </div>
                    </form>

                </ModalLayout>
            }
            {viewimage &&
                <ModalLayout setModal={setViewImage} clas={`w-11/12 mx-auto lg:w-[60%]`}>
                    <div className="w-full bg-white p-10 rounded-md relative">
                        <div className="text-xl font-bold text-center mb-3">Payment Proof</div>
                        <div className="">
                            <img src={`${profileImg}/transfers/${selectedItem?.usertransfers?.firstname}/${selectedItem.verifications[0]?.image}`} alt="" />
                        </div>
                    </div>

                </ModalLayout>
            }

            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-zinc-500 text-xl text-white">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                User
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Times
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Image Proof
                            </th>
                            <th scope="col" className="px-3 py-3">
                                OTP code
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Verification
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item, i) => (
                            <tr className="bg-white border-b " key={i}>
                                <td className="px-3 py-3">
                                    {item.usertransfers.firstname} {item.usertransfers.lastname}
                                </td>
                                <td className="px-3 py-3">
                                    {item.usertransfers?.email}
                                </td>
                                <td className="px-3 py-3">
                                    {item.usertransfers?.currency}{item.amount}
                                </td>
                                <td className="px-3 py-3">
                                    {item.times}
                                </td>
                                <td className="px-3 py-3">
                                    {item.verifications[0]?.image ?
                                        <button onClick={()=> setViewImage(true)} onMouseOver={() => selectOne(item)} className="bg-green-500 text-white px-5 rounded-lg py-2">click to view</button>
                                        : 'no image uploaded'}
                                </td>
                                <td className="px-3 py-3">
                                    {item.verifications[0]?.image && <button onMouseOver={() => selectOne(item)} className="bg-yellow-500 text-white px-5 rounded-lg py-2">send otp</button>}
                                </td>
                                <td className="px-3 py-3">
                                    <button onClick={() => setModal(true)} onMouseOver={() => selectOne(item)} className="bg-primary text-white px-5 rounded-lg py-2">create verification</button>
                                </td>
                            </tr>
                        )) :
                            <div className=" w-full text-lg font-semibold flex items-center justify-center">No transfers found</div>
                        }

                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default Verifications