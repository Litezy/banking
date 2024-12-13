import TablePagination from 'admin/adminComponents/TablePagination'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Apis, GetApi } from 'services/Api'
import { errorMessage } from 'utils/functions'

const TableHeader = [
    "S/N",
    "Role",
    "Full Name",
    "Email",
    "Phone Number",
    "KYC",
    "Suspended",
    "Country",
    "State",
    "Password",
    "Balance",
    "Date Joined",
    "....",
]

const UserDetails = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchParams,] = useSearchParams()
    const search = searchParams.get('page')
    const [text, setText] = useState('')

    const [users, setUsers] = useState([])

    const fetchUsers = useCallback(async (tag) => {
        try {
            setLoading(true)
            const res = await GetApi(`${Apis.admin.all_users}?p=${search ?? 1}${tag ? `&search=${tag}` : ''}`)
            // console.log(res)
            if (res.status === 200) {
                setUsers(res)
            }
        } catch (error) {
            console.log(error)
            errorMessage(`sorry, something went wrong on our end`, error.message)
        } finally {
            setLoading(false)
        }
    }, [search])

    useEffect(() => {
        fetchUsers("")
    }, [fetchUsers])

    function HandlePaging(num) {
        navigate(`?page=${num}`)
    }

     function HandleSearching() {
        if(!text) return fetchUsers("") 
            return fetchUsers(text) 
    }

    function ClearSearch() {
        setText('')
        return fetchUsers("")
    }

    if (loading) return (
        <div>
            <div className="w-full flex items-center justify-between">
                <div className="text-lg font-semibold">User Details</div>
            </div>
            <div className="my-5 text-xl font-bold text-center">Below are Users Details on your platform</div>

            <div className="my-5 bg-white w-full h-fit p-5 rounded-md shadow-md">
                <div className="text-center text-xl font-semibold" >Showing 0 out of 0 users created    </div>
            </div>

            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-primary text-white">
                        <tr>
                            {TableHeader.map((item, index) => (
                                <th key={index} scope="col" className="px-3 py-3 text-sm truncate">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                {new Array(10).fill(0).map((item, i) => (
                    <div key={i} className='bg-slate-200 mb-2 p-3 h-12 animate-pulse'></div>
                ))}

            </div>
        </div>
    )

    if (!loading) return (
        <div>
            <div className="w-full flex items-center justify-between">
                <div className="text-lg font-semibold">User Details</div>
            </div>
            <div className="my-5 text-xl font-bold text-center">Below are Users Details on your platform</div>

            <div className="my-5 bg-white w-full h-fit p-5 rounded-md shadow-md">
                <div className="text-center text-xl font-semibold" >Showing {users.data?.length} out of {users.total === 0 ? `${users.total} user` : `${users.total} users`} created    </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className=""></div>
                <div className="flex items-center justify-end gap-5">
                <div className="flex items-center border rounded-xl bg-white shadow-xl">
                    <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Search aything here..." className="outline-none w-full border-none bg-transparent p-2" />
                    <button onClick={HandleSearching} className="py-3 px-7 capitalize text-white bg-primary rounded-tr-xl rounded-br-xl">search</button>
                </div>
               {text && <button onClick={ClearSearch} className="py-3 px-4 bg-slate-400 text-white rounded-md">Clear</button>}
                </div>
            </div>
            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-primary text-white">
                        <tr>
                            {TableHeader.map((item, index) => (
                                <th key={index} scope="col" className="px-3 py-3 text-sm truncate">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users.data) ? users.data?.map((item, i) => (
                            <tr className="bg-white border-b cursor-pointer even:bg-slate-100 hover:bg-primary/10"
                                onClick={() => navigate(`/admin/user/${item.id}`)}
                                key={i}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.id}
                                </th>
                                <td className="px-3 py-3 truncate uppercase">
                                    {item.role}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.firstname} {item.lastname}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.email}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.dailcode}{item.phone}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.kyc}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.suspended === 'true' ? 'Yes' : 'No'}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.country}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.state}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.password}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {item.currency}{item.balance}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    {moment(item.createdAt).format(`DD-MM-YYYY hh:mm A`)}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    View more
                                </td>
                            </tr>
                        )) :
                            <div className=" w-full text-lg font-semibold flex items-center justify-center">No Users</div>
                        }

                    </tbody>
                </table>

                <TablePagination
                    onChange={HandlePaging}
                    page={search}
                    perPage={users.page_size}
                    total={users.total}
                />

            </div>
        </div>
    )
}

export default UserDetails