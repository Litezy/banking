import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Apis, GetApi } from 'services/Api'

const ActiveComponent = ({actives}) => {


    // const profile = useSelector((state) => state.profile.profile)
    // const actives = useSelector((state) => state.profile.active_chats)
    const navigate = useNavigate()
    const [selected,setSelected] = useState({})
    const [loading, setLoading] = useState(false)
    const TableHeaders = [
        "Ticket ID",
        "Ticket Subject",
        "Ticket Status",
        "Date Created",
        "messages"
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
                        {actives.length > 0 ? actives.map((item, i) => (
                             <tr className="bg-white border-b last:border-none " key={i}>
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
                             <td className="px-3  py-3 truncate">
                                <Link to={`/user/tickets/status/active_chats/${item.id}`}  
                                className='trucate w-fit px-3 py-1 rounded-md bg-gradient-to-tr from-primary to-purple-700 text-white'>open message</Link>
                             </td>
                         </tr>
                        )) :
                            <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                                <td>No active tickets found</td>
                            </tr>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )


}

export default ActiveComponent