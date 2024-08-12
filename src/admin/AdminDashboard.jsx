import React, { useCallback, useEffect, useState } from 'react'
import { errorMessage } from 'utils/functions'

import { Apis, GetApi, profileImg } from 'services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchCurrency, dispatchProfile, dispatchUserSavings } from 'app/reducer'
import axios from 'axios'
import ModalLayout from 'utils/ModalLayout'
import Summary from './adminComponents/Summary'

const AdminDashboard = () => {

    
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([])
    const [savings, setSavings] = useState('')
    const [kyc, setKyc] = useState([])
    const [transactions, setTransactions] = useState([])
    const [plans,setPlans] = useState([])
    const [viewMore, setViewMore] = useState(false)

   
  
    const fetchUser= useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile)
            if (response.status === 200) {
                setProfile(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        }
    }, [])

    useEffect(()=>{
        fetchUser()
    },[])
    const fetchUsers = useCallback(async () => {
        try {
            const response = await GetApi(Apis.admin.all_users)
            if (response.status === 200) {
                setUsers(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        }
    }, [])

    const fetchUserSavings = useCallback(async () => {
        try {
            const response = await GetApi(Apis.admin.all_depo)
            if (response.status === 200) {
                setSavings(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    }, [])
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await GetApi(Apis.admin.all_trans)
            if (response.status === 200) {
                setTransactions(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    }, [])
    const fetchSavingsPlans = useCallback(async () => {
        try {
            const response = await GetApi(Apis.admin.all_plans)
            if (response.status === 200) {
                setPlans(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    }, [])

    const fetchKyc = useCallback(async () => {
        try {
            const response = await GetApi(Apis.admin.all_kyc)
            if (response.status === 200) {
                setKyc(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])
    useEffect(() => {
        fetchUsers()
        fetchTransactions()
        fetchUserSavings()
        fetchSavingsPlans()
        fetchKyc()
    }, [profile, dispatch])


    
    return (
        <div className='mt-20 md:mt-5 w-11/12 mx-auto h-fit pb-20  '>
           <div className="md:grid block md:grid-cols-2 md:w-full w-3/4 mx-auto gap-5 md:h-40">
           <Summary  color='bg-black text-white' title={'Total Users'} data={users.length}/>
            <Summary   color='bg-green-500 text-white' title={'Total Deposits'} data={`$${savings}`}/>
            <Summary   color='bg-red-500 text-white' title={'Total Transactions'} data={transactions.length}/>
            <Summary   color='bg-orange-500 text-white' title={'Total Savings Plans'} data={plans.length}/>
           </div>
        </div>
      )


}
export default AdminDashboard