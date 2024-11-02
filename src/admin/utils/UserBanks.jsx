import TablePagination from 'admin/adminComponents/TablePagination';
import React, { useCallback, useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import { Apis, GetApi } from 'services/Api';
import { errorMessage } from 'utils/functions';

const UserBanks = ({ setActive }) => {
    const [banksArr, setBanksArr] = useState([])
    const [page, setPage] = useState(1)

    const fetchUserBanks = useCallback(async () => {
        try {
            const res = await GetApi(`${Apis.admin.all_banks}?p=${page}`)
            if (res.status === 200) {
                setBanksArr(res)
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        }
    }, [page])

    useEffect(() => {
        fetchUserBanks()
    }, [fetchUserBanks])
    return (
        <div className='w-full'>
            <div className="w-full flex items-center justify-between">
                <div onClick={() => setActive(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
                    <IoReturnUpBackOutline className='text-2xl' />
                </div>
                <div className="text-lg font-semibold">User Banks</div>
            </div>

            <div className="my-5 bg-white w-full h-fit p-5 rounded-md shadow-md">
                <div className="text-center text-xl font-semibold" >Showing {banksArr.data?.length} out of {banksArr.total === 0 ? `${banksArr.total} bank` : `${banksArr.total} banks`} submitted    </div>


            </div>

            <div className="">
                {banksArr.data?.map((item, i) => {
                    return (
                        <div className="h-fit w-full relative bg-white rounded-lg mb-3 p-10" key={i}>

                            <div className="w-full flex items-start gap-5 flex-col ">
                                <div className="self-center md:text-2xl text-lg text-primary font-semibold">{item.userbanks?.firstname} {item.userbanks?.lastname}'s {item.bank_name} Bank Details</div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Holder's Fullname:</div>
                                    <div className="text-right">{item.fullname}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Bank Name:</div>
                                    <div className="text-right">{item.bank_name}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Bank Account No:</div>
                                    <div className="text-right">{item.account_no}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Bank Address:</div>
                                    <div className="text-right">{item.bank_address}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Account Type:</div>
                                    <div className="text-right">{item.account_type}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Routing No.</div>
                                    <div className="text-right">{item.route_no}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Swift/BIC Code</div>
                                    <div className="text-right">{item.swift}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">IBAN</div>
                                    <div className="text-right">{item.iban}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <TablePagination
                    onChange={num => setPage(num)}
                    page={page}
                    perPage={banksArr.page_size}
                    total={banksArr.total} />
            </div>
        </div>
    )
}

export default UserBanks