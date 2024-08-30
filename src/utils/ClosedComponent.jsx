import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'


const ClosedComponent = ({closed}) => {

    const profile = useSelector((state) => state.profile.profile)
    const [loading, setLoading] = useState(false)
    const TableHeaders = [
        "ID",
        "Status",
        "Subject",
        "Created",
    ]

    return (
        <div className='w-full'>
            <div className="relative overflow-x-auto rounded-md ">
                <table className="w-full text-sm text-left rtl:text-right relative">
                    <thead className=" bg-gradient-to-tr from-primary to-purple-700 text-xl text-white">
                        <tr>
                            {TableHeaders.map((item, index) => (
                                <th scope="col" key={index} className="px-3 py-3 text-sm truncate">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {closed.length > 0 ? closed.map((item, i) => (
                            <tr className="bg-white border-b " key={i}>
                                <td className="px-3 py-3">
                                    {item.name}
                                </td>
                                <td className="px-3 py-3">
                                    {profile?.currency}{item.goal.toLocaleString()}
                                </td>
                                <td className="px-3 py-3">
                                    {profile?.currency}{item.current.toLocaleString()}
                                </td>
                                <td className={`px-3 py-3 text-white `}>
                                    <p className={`rounded-md py-1 px-3 text-center ${item.status === 'complete' ? 'bg-green-600' : 'bg-red-600'}`}>
                                        {item.status}
                                    </p>

                                </td>
                                <td className="px-3  py-3 truncate">
                                    {moment(item.createdAt).format('DD-MM-YYYY')}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {moment(item.updatedAt).format('DD-MM-YYYY')}
                                </td>

                            </tr>
                        )) :
                            <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                                <td>No closed tickets found</td>
                            </tr>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )


}

export default ClosedComponent