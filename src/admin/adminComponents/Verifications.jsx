import React, { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { Apis, GetApi, PostApi, profileImg } from 'services/Api'
import { errorMessage, successMessage } from 'utils/functions'
import moment from 'moment'
import ModalLayout from 'utils/ModalLayout'
import FormComponent from 'utils/FormComponent'
import ButtonComponent from 'utils/ButtonComponent'
import Loader from 'utils/Loader'
import UserVerifications from 'admin/adminComponents/UserVerifications'
import { useNavigate } from 'react-router-dom'

const Verifications = () => {

    const [data, setData] = useState([])
    const [screen, setScreen] = useState(1)
    const [selectedItem, setSelectedItem] = useState({})
    const navigate = useNavigate()
  

    const fetchVerifications = useCallback(async () => {
        try {
            const res = await GetApi(Apis.admin.all_transfers)
            if (res.status === 200) {
                setData(res.data)
                // console.log(res.data[0].id)
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

    const selectOne = (item) => {
        setSelectedItem(item)
    }

    
    return (
        <div className='w-11/12  mx-auto'>
            <div className="w-full flex items-center justify-between">
                <div className="w-2/4 mx-auto">
                    <Summary color='bg-zinc-500 text-white' title={'Total Transfers'} data={data?.length} />
                </div>
            </div>


            {screen === 1 && <div className="relative overflow-x-auto rounded-md mt-10">
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
                                    <button 
                                    className='w-fit px-4 py-1 rounded-md bg-primary text-white text-base ' 
                                    onMouseOver={()=> selectOne(item)} 
                                    onClick={()=>navigate(`/admin/verifications/${encodeURIComponent(item?.id)}`)}>Explore Verifications</button>
                                </td>
                                
                            </tr>
                        )) :
                        <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                        <td>No transfers found</td>
                    </tr>
                        }

                    </tbody>
                </table>
           
            </div>}
            
        </div>
    )
}

export default Verifications