import React, { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { errorMessage } from 'utils/functions'
import { Apis, GetApi } from 'services/Api'
import moment from 'moment'

const Newsletters = () => {

    const [data,setData] = useState([])

    const fetchNews = useCallback( async ()=>{
      try {
        const res = await GetApi(Apis.admin.subs)
        if(res.status === 200 ){
          setData(res.data)
        }else{
          errorMessage(res.msg)
        }
      } catch (error) {
        console.log(error)
        errorMessage(error.message)
      }
    },[])

    useEffect(()=>{
      fetchNews()
    },[])
  return (
    <div className='w-11/12 mx-auto'>
         <div className="w-2/4 mx-auto">
        <Summary color='bg-slate-600 text-white' title={'Total Newsletter Subscribers'} data={data.length} />
      </div>

      <div className="my-5 text-3xl font-bold text-center ">Susbscribers Details</div>

      <div class="relative overflow-x-auto rounded-md mt-10">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class=" bg-slate-600 text-xl text-white">
            <tr>
              <th scope="col" class="px-3 py-3">
                ID
              </th>
              <th scope="col" class="px-3 py-3">
                Email
              </th>
              <th scope="col" class="px-3 py-3">
                Date Subcribed
              </th>
              
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, i) => (
              <tr class="bg-white border-b " key={i}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.id}
                </th>
                <td class="px-3 py-3">
                  {item.email}
                </td>
                <td class="px-3 py-3">
                  {moment(item.createdAt).format(`DD-MM-YYYY hh:mm A`)}
                </td>
                
              </tr>
            )) :
              <div className=" w-full text-lg font-semibold flex items-center justify-center">No Subscribers found</div>
            }

          </tbody>
        </table>


      </div>
    </div>
  )
}

export default Newsletters