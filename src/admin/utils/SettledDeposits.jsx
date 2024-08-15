import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { Apis, GetApi } from 'services/Api'
import { errorMessage } from 'utils/functions'

const SettledDeposits = ({ setScreen }) => {

    const [deposits, setDeposits] = useState([])

    const fetchDepos = useCallback(async () => {
        try {
            const res = await GetApi(Apis.admin.settled_depos)
            if (res.status === 200) {
                setDeposits(res.data)
            } else {
                errorMessage(res.msg)
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        }
    })
    useEffect(() => {
        fetchDepos()
    }, [])
    return (
        <div className="w-11/12 mx-auto">
            <div className="w-full flex items-center justify-between">
                <div onClick={() => setScreen(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                    <IoReturnUpBackOutline className='text-2xl' />
                </div>
                <div className="text-lg font-semibold">Settled Deposits</div>
            </div>
            <div className="my-3 text-2xl font-bold text-center">Settled Deposits</div>
            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-primary text-xl text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Submitted
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Settled
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits.length > 0 ? deposits.map((item, i) => (
                            <tr className="bg-white border-b " key={i}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.userdeposits?.firstname}  {item.userdeposits?.lastname}
                                </th>
                                <td className="px-6 py-4">
                                    {item.userdeposits?.id}
                                </td>
                                <td className="px-6 py-4">
                                    {item.userdeposits.currency}{item.amount}
                                </td>
                                <td className={`px-6 py-4 font-semibold ${item.status === 'complete' ?'text-green-500':'text-red-600'}`}>
                                   {item.status}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(item.createdAt).format(`DD-MM-YYYY hh:mm A`)}
                                </td>
                                <td className="px-6 py-4">
                                    {moment(item.updatedAt).format(`DD-MM-YYYY hh:mm A`)}
                                </td>

                            </tr>
                        )) :
                            <div className=" w-full text-lg font-semibold flex items-center justify-center">No deposits to validate</div>
                        }

                    </tbody>
                </table>


            </div>

        </div>
    )
}

export default SettledDeposits