import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Apis, GetApi, PutApi } from 'services/Api'
import { errorMessage } from 'utils/functions'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import ButtonComponent from 'utils/ButtonComponent'
import FormComponent from 'utils/FormComponent'
import { successMessage } from 'utils/functions'
import Loader from 'utils/Loader'
import ModalLayout from 'utils/ModalLayout'

export default function SingleUserPage() {
    const params = useParams()
    const [data, setData] = useState({})
    const [loads, setLoads] = useState(true)

    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        dial_code: '',
        suspended: '',
        country: '',
        state: '',
        password: '',
        phone: '',
        requestCode: '',
        amount: '',
        transferCode: '',
        requestMessage: '',
    });
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const createUser = async (e) => {
        e.preventDefault()
        if (!forms.firstname) return errorMessage('Firstname is required')
        if (!forms.lastname) return errorMessage('Lastname is required')
        if (!forms.country) return errorMessage('Country is required')
        if (!forms.state) return errorMessage('state is required')
        if (!forms.dial_code) return errorMessage('Dial code is required')
        if (!forms.gender) return errorMessage('Gender is required')
        if (!forms.password) return errorMessage('Password is required')
        if (!forms.suspended) return errorMessage('Account suspend status is required')
        if (!forms.requestCode) return errorMessage('Sepcify if this account will require code on any transfer')
        if (forms.requestCode === 'yes' && !forms.transferCode) return errorMessage('Transfer code is required')
        if (forms.requestCode === 'yes' && !forms.amount) return errorMessage('Amount is required')
        if (forms.requestMessage === 'yes' && !forms.requestMessage) return errorMessage('Request message is required')
        setLoading(true)
        try {
            const formData = {
                ...forms,
                id: params.id
            }
            const res = await PutApi(Apis.admin.update_user, formData)
            if (res.status === 200) {
                successMessage(res.msg)
            } else {
                errorMessage(res.msg)
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.mesage)
        } finally {
            setLoading(false)
        }
    }


    const FetchData = useCallback(async () => {
        setLoads(true)
        try {
            const response = await GetApi(`${Apis.admin.single_user}/${params.id}`)
            if (response.status !== 200) return errorMessage(response.msg)
            setData(response.data)
            const file = response.data
            setForms({
                ...forms,
                firstname: file.firstname,
                lastname: file.lastname,
                gender: file.gender,
                dial_code: file.dial_code,
                country: file.country,
                suspended: file.suspended,
                state: file.state,
                password: file.password,
                phone: file.phone,
                requestCode: file.requestCode,
                amount: file.amount,
                transferCode: file.transferCode,
                requestMessage: file.requestMessage,
            })
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoads(false)
        }
        // eslint-disable-next-line
    }, [params])

    useEffect(() => {
        FetchData()
    }, [FetchData])

    if (loads) return (
        <div>Loading Data....</div>
    )
    return (
        <div>
            <div className='w-11/12 mx-auto my-20'>
                {loading &&
                    <ModalLayout setModal={setLoading} clas={`w-11/12 mx-auto max-w-xl`}>
                        <div className="absolute left-1/2 bg-white p-5 rounded-md -translate-x-1/2 top-1/2">
                            <Loader />
                        </div>
                    </ModalLayout>
                }
                <div className="w-full flex items-center justify-between">
                    <Link to="/admin/users" className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                        <IoReturnUpBackOutline className='text-2xl' />
                    </Link>
                    <div className="text-lg font-semibold">Update {data.firstname}'s Profile</div>
                </div>
                <div className="my-10 text-center font-light">Create new user by entering the following details</div>
                <form onSubmit={createUser} className='shadow-md w-full bg-white p-8 rounded-lg relative'>
                    <div className="flex items-start flex-col   lg:flex-row gap-4">
                        <div className="flex items-start flex-col lg:w-1/2 w-full gap-3">
                            <div className="flex items-start gap-1 flex-col w-full ">
                                <div className="">First Name:</div>
                                <FormComponent name={`firstname`} value={forms.firstname} onchange={handleChange} />
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Last Name:</div>
                                <FormComponent name={`lastname`} value={forms.lastname} onchange={handleChange} />
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Dial Code:</div>
                                <FormComponent name={`dial_code`} value={forms.dial_code} onchange={handleChange} />
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Phone no:</div>
                                <FormComponent formtype='phone' name={`phone`} value={forms.phone} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="flex flex-col items-start lg:w-1/2 w-full gap-3">
                            <div className="flex items-start gap-1 flex-col w-full ">
                                <div className="">Country:</div>
                                <FormComponent name={`country`} value={forms.country} onchange={handleChange} />
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">State:</div>
                                <FormComponent name={`state`} value={forms.state} onchange={handleChange} />
                            </div>
                            <div className="w-full">
                                <div className="">Gender:</div>
                                <div >
                                    <select className='w-full border-zinc-300 h-12 border px-2 py-1 rounded-md  outline-none' name={'gender'} value={forms.gender} onChange={handleChange} >
                                        <option >--select--</option>
                                        <option name='male' value="male">Male</option>
                                        <option name='female' value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="">Suspended:</div>
                                <div >
                                    <select className='w-full border-zinc-300 h-12 border px-2 py-1 rounded-md  outline-none' name={'suspended'} value={forms.suspended} onChange={handleChange} >
                                        <option >--select--</option>
                                        <option value="true">Suspend</option>
                                        <option value="false">Not Suspend</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Password:</div>
                                <FormComponent formtype='password' name={`password`} value={forms.password} onchange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-5">
                        <div className="">Request for code on transfer:</div>
                        <div >
                            <select className='w-full py-2 outline-none border' name={'requestCode'} value={forms.requestCode} onChange={handleChange} >
                                <option >--select--</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                            </select>
                        </div>
                        {forms.requestCode === 'yes' && <>

                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Transfer Code:</div>
                                <FormComponent name={`transferCode`} value={forms.transferCode} onchange={handleChange} />
                            </div>

                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Amount:</div>
                                <FormComponent name={`amount`} value={forms.amount} onchange={handleChange} />
                            </div>
                            <div className="flex items-start gap-1 flex-col w-full">
                                <div className="">Request message:</div>
                                <FormComponent name={`requestMessage`} value={forms.requestMessage} onchange={handleChange} />
                            </div>
                        </>}
                    </div>
                    <div className="w-2/4 mx-auto mt-5">
                        <ButtonComponent title={`Update User`} bg={`text-white bg-primary h-12 rounded-md`} />
                    </div>
                </form>
            </div>
        </div>
    )
}


