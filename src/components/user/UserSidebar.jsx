import React, { useCallback, useEffect, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Apis, GetApi, PostApi } from 'services/Api'
import { CookieName, errorMessage, successMessage } from 'utils/functions'
import ModalLayout from 'utils/ModalLayout'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { dispatchCurrency, dispatchNotifications, dispatchProfile } from 'app/reducer'
import axios from 'axios'
import { FiRefreshCcw } from "react-icons/fi";

const SideLinks = [
    { path: 'dashboard', url: '/user' },
    { path: 'savings', url: '/user/savings' },
    { path: 'transfer', url: '/user/transfer' },
    { path: 'transactions', url: '/user/transactions' },
    { path: 'notifications', url: '/user/notifications' },
    { path: 'profile', url: '/user/profile' },
   
]

const SideLinks2 = [
    { path: 'settings', url: '/user/settings' },
    { path: 'logout', url: '' },
]

export default function UserSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [logout, setLogout] = useState(false)
    const [hide,setHide] = useState(false)
    const [isRotating,setIsRotating]= useState(false)
    const navigate = useNavigate()
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
        }
    }

    const LogoutUser = async () => {
        try {
            const response = await PostApi(Apis.auth.logout)
            // console.log(response)
            if (response.status === 200) {
                successMessage(response.msg)
                Cookies.remove(CookieName)
                navigate('/login')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            return errorMessage(error.message)
        }
    }

    
    const [profile, setProfile] = useState({})
    const [currency, setCurrency] = useState(null)
    const [notifications,setNotifications] = useState([])


    

    const fetchUserProfile = useCallback(async () => {
        setIsRotating(true)
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status === 200) {
                setProfile(response.data);
                dispatch(dispatchProfile(response.data));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        }finally{
            setIsRotating(false)
        }
    }, [dispatch]);



    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const fetchUserNotifications = useCallback(async()=>{
        try {
            const response = await GetApi(Apis.auth.user_notifications)
            if(response.status === 200){
                setNotifications(response.data)
                dispatch(dispatchNotifications(response.data))
            }else{
                console.log(response)
            }
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    },[])

    useEffect(()=>{
        fetchUserNotifications()
    },[])






    let firstChar = profile?.firstname?.substring(0, 1)
    let lastChar = profile?.lastname?.substring(0, 1)
    
    return (
        <div>
            <div className="flex flex-col px-3 h-[80dvh]">
                {logout &&
                    <ModalLayout setModal={setLogout} clas={`lg:w-[35%] w-11/12 mx-auto`}>
                        <div className="bg-white py-5 px-3 h-fit flex-col text-black rounded-md flex items-center justify-center">
                            <div className="text-xl font-semibold self-center">Confirm Logout</div>
                            <div className="flex items-center justify-between w-full">
                                <button onClick={() => setLogout(false)} className='w-fit text-white px-4 py-2 rounded-lg bg-red-500'>cancel</button>
                                <button onClick={LogoutUser} className='w-fit text-white px-4 py-2 rounded-lg bg-green-500'>confirm</button>
                            </div>
                        </div>
                    </ModalLayout>
                }
                <div className="bg-slate-100/20 rounded-lg p-3 flex flex-col items-center justify-center gap-3 mt-6 mb-5">
                    <div className="py-3 px-3.5 rounded-full text-white bg-gradient-to-tr from-primary to-purple-700 w-fit h-fit uppercase">{firstChar}{lastChar}</div>
                    <div className="text-white text-center capitalize text-sm">{profile?.firstname} {profile?.lastname}</div>
                    <div className="text-white items-center gap-2 font-bold text-xl flex justify-center">
                       <div onClick={fetchUserProfile} className="">
                       <FiRefreshCcw className={`text-sm cursor-pointer ${isRotating ?'rotating':''}`} />
                       </div>
                        <div className="flex items-center ">
                            <span>{currency}</span>
                            <span>{hide ? '***':profile?.balance?.toLocaleString()}</span>
                        </div>
                        <IoEyeOutline onClick={()=> setHide(prev => !prev)} className='text-sm self-center ml-2 cursor-pointer' />
                    </div>
                </div>
                {SideLinks.map((item, index) => (
                    <Link to={item.url} key={index} className={`text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} px-3 mb py-2 font-extralight capitalize transition-all`}>
                        {item.path}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col px-3 mt-2">
                {SideLinks2.map((item, index) => (
                    <Link to={item.url} onClick={() => logOut(item)} key={index} className="text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 px-3 py-2 font-extralight capitalize transition-all">
                        {item.path}
                    </Link>
                ))}
            </div>
        </div>
    )
}
