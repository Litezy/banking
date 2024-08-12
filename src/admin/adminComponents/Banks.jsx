import React, { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { useSelector } from 'react-redux'
import { Apis, GetApi, PostApi } from 'services/Api'
import { errorMessage, successMessage } from 'utils/functions'
import Loader from 'utils/Loader'

const Banks = () => {
  const [banks, setBanks] = useState([])
  const profile = useSelector((state) => state.profile.profile)
  const [loading, setLoading] = useState(false)
  const [selectedItem,setSelectedItem] = useState({})

  const fetchBanks = useCallback(async () => {
    try {
      const res = await GetApi(Apis.admin.admin_banks)
      if (res.status === 200) {
        setBanks(res.data)
      } else {
        console.log(res)
        errorMessage(res.smg)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error.message)
    }
  }, [profile])

  useEffect(() => {
    fetchBanks()
  }, [profile])


  const select = (item)=>{
    setSelectedItem(item)
  }
  const HideOrUnhide = async () => {
    const formdata = {
      id:selectedItem.id
    }
    setLoading(true)
    try {
     const res = await PostApi(Apis.admin.hide,formdata)
     if(res.status === 200){
      successMessage(res.msg)
      fetchBanks()
     }else{
      errorMessage(res.msg)
     }
    } catch (error) {
       console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='w-11/12 mx-auto'>
      <div className="w-2/4 mx-auto">
        <Summary color='bg-orange-500 text-white' title={'Total Admin Banks'} data={banks.length} />
      </div>
      <div class="relative overflow-x-auto rounded-md mt-10 ">
        {loading &&
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
            <Loader />
          </div>
        }

        <table class="w-full text-sm text-left rtl:text-right">
          <thead class=" bg-orange-500 text-base text-white">
            <tr>
              <th scope="col" class="px-3 py-3">
                Bank Name
              </th>
              <th scope="col" class="px-3 py-3">
                Owner
              </th>
              <th scope="col" class="px-3 py-3">
                Address
              </th>
              <th scope="col" class="px-3 py-3">
                Account No.
              </th>
              <th scope="col" class="px-3 py-3">
                Route No.
              </th>
              <th scope="col" class="px-3 py-3">
                Swift No
              </th>
              <th scope="col" class="px-3 py-3">
                Iban No
              </th>
              <th scope="col" class="px-3 py-3">
                Alter
              </th>
            </tr>
          </thead>
          <tbody>
            {banks.length > 0 ? banks.map((item, i) => (
              <tr class="bg-white border-b " key={i}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.bank_name}
                </th>
                <td class="px-3 py-3">
                  {item.fullname}
                </td>
                <td class="px-3 py-3">
                  {item.bank_address}
                </td>
                <td class="px-3 py-3">
                  {item.account_no}
                </td>
                <td class="px-3 py-3">
                  {item.route_no}
                </td>
                <td class="px-3 py-3">
                  {item.swift}
                </td>
                <td class="px-3 py-3">
                  {item.iban}
                </td>
                <td class="px-3 py-3">
                  <button onClick={HideOrUnhide} onMouseOver={()=>select(item)} className={`${item.hidden === 'true' ? 'bg-orange-500' : 'bg-primary'} text-white px-3 rounded-lg py-2`}>{item.hidden === 'true' ? 'Unhide' : 'Hide'}</button>
                </td>
              </tr>
            )) :
              <div className=" w-full text-lg font-semibold flex items-center justify-center">No transactions found</div>
            }

          </tbody>
        </table>


      </div>
    </div>
  )
}

export default Banks