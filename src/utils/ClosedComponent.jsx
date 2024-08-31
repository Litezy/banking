import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'


const ClosedComponent = ({closed}) => {

    const profile = useSelector((state) => state.profile.profile)
    const [loading, setLoading] = useState(false)
    const TableHeaders = [
        "Ticket ID",
        "Ticket Subject",
        "Ticket Status",
        "Date Created",
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
                                 {item.id}
                             </td>
                             <td className="px-3 py-3">
                                 {item.subject}
                             </td>
                             <td className="px-3 py-3">
                                 {item.status}
                             </td>
                             <td className="px-3  py-3 truncate">
                                 {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
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