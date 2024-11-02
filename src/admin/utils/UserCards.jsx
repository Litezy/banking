import TablePagination from 'admin/adminComponents/TablePagination';
import React, { useCallback, useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import { Apis, GetApi } from 'services/Api';
import { errorMessage } from 'utils/functions';

const UserBanks = ({ setActive }) => {
    const [cardsArr, setCardsArr] = useState([])
    const [page, setPage] = useState(1)
    
    const fetchUserBanks = useCallback(async () => {
        try {
            const res = await GetApi(`${Apis.admin.all_cards}?p=${page}`)
            if (res.status === 200) {
                setCardsArr(res)
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
                <div className="text-lg font-semibold">User Cards</div>
            </div>

            <div className="my-5 bg-white w-full h-fit p-5 rounded-md shadow-md">
                <div className="text-center text-xl font-semibold" >Showing {cardsArr.data?.length} out of {cardsArr.total === 0 ? `${cardsArr.total} bank`:`${cardsArr.total} cards`} submitted    </div>


            </div>

            <div className="">
                {cardsArr.data?.map((item, i) => {
                    return (
                        <div className="h-fit w-full relative bg-white rounded-lg mb-3 p-10" key={i}>

                            <div className="w-full flex items-start gap-5 flex-col ">
                                <div className="self-center md:text-2xl text-lg text-primary font-semibold capitalize">{item.usercards?.firstname} {item.usercards?.lastname }'s {item.type}  Card Details</div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Card Holder:</div>
                                    <div className="text-right">{item.name}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Card No:</div>
                                    <div className="text-right">{item.card_no}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Account Type:</div>
                                    <div className="text-right">{item.type}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Cvv:</div>
                                    <div className="text-right">{item.cvv}</div>
                                </div>
                                <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                    <div className="lg:w-[45%]">Exp:</div>
                                    <div className="text-right">{item.exp}</div>
                                </div>
                              
                            </div>
                        </div>
                    )
                })}
                <TablePagination
                    onChange={num => setPage(num)}
                    page={page}
                    perPage={cardsArr.page_size}
                    total={cardsArr.total} />
            </div>
        </div>
    )
}

export default UserBanks