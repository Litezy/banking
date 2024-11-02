import React, { useCallback, useEffect, useState } from 'react'
import { Apis, GetApi } from 'services/Api'
import { errorMessage } from 'utils/functions'
import Summary from './Summary'
import moment from 'moment'
import TablePagination from './TablePagination'

const VerifiedTransfers = () => {

    const [data, setData] = useState({})
    const [load, setLoad] = useState(false)
    const [page, setPage] = useState(1)

    const TableHeaders = [
        "User",
        "Email",
        "Amount",
        "Status",
        "Date Created",
        "Date Completed",

    ]

    const fetchVerifications = useCallback(async () => {
        setLoad(true)
        try {
            const res = await GetApi(`${Apis.admin.completed_transfers}?p=${page}`)
            if (res.status !== 200) return errorMessage(res.msg)
            setData(res)
        } catch (error) {
            // console.log(error)
            errorMessage(`sorry, error in fetching transfers`, error)
        } finally {
            setLoad(false)
        }
    }, [page])

    useEffect(() => {
        fetchVerifications()
    }, [fetchVerifications])


    if(load) return (
        <div>Loading Data...</div>
    )

    return (

        <div className="w-11/12 mx-auto mt-10">

            <div className="w-full flex items-center justify-between">
                <div className="lg:w-2/4 w-3/4 mx-auto">
                    <Summary color='bg-primary text-white' title={'Total Verified Transfers'} data={`Showing ${data.data?.length} out of ${data.total}`} />
                </div>
            </div>

            <div>
                <div className="relative overflow-x-auto rounded-md mt-10">

                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-primary text-xl text-white">
                            <tr>
                                {TableHeaders.map((item, index) => (
                                    <th scope="col" key={index} className="px-3 py-3 text-sm truncate">
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.total > 0 ? data.data?.map((item, i) => (
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
                                        {item.status}
                                    </td>

                                    <td className="px-3 py-3">
                                        {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
                                    </td>
                                    <td className="px-3 py-3">
                                        {moment(item.updatedAt).format('DD-MM-YYYY hh:mm A')}
                                    </td>

                                </tr>
                            )) :
                                <tr className="bg-white border-b ">
                                    <td className="px-3 py-3 truncatex">
                                        No verified transactions data found!
                                    </td>


                                </tr>
                            }

                        </tbody>
                    </table>

                    <TablePagination
              onChange={num => setPage(num)}
              page={page}
              perPage={data.page_size}
              total={data.total}
            />

                </div>

            </div>
        </div>
    )
}

export default VerifiedTransfers