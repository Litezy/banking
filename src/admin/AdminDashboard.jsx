import React, { useEffect, useState } from 'react'

import { Apis, GetApi } from 'services/Api'
import Summary from './adminComponents/Summary'

export default function AdminDashboard (){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
useEffect(() => {
    (async () => {
        setLoading(true)
        try {
            const response = await GetApi(Apis.admin.admin_board_overview)
            return setData(response.data)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    })()
}, [])

if(loading) {
    return <div>Loading Data....</div>
}
    return (
        <div className=' md:mt-5 w-11/12 mx-auto h-fit py-10   '>
            <div className="md:grid block md:grid-cols-2 md:w-full lg:grid-cols-3 w-3/4 mx-auto gap-5 ">
                {data?.map((item, index) => (
                    <Summary key={index} color='bg-gradient-to-tr from-primary to-purple-700 text-white !font-medium !text-center !capitalize !text-sm' title={item.title} data={`${item.currency ? `$` : ''}${item.content?.toLocaleString()}`} />
                ))}
            </div>
        </div>
    )


}


