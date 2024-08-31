import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Apis, GetApi, PostApi } from 'services/Api'
import { CookieName, errorMessage, successMessage } from 'utils/functions'
import ModalLayout from 'utils/ModalLayout'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BsChevronDoubleDown } from "react-icons/bs";
import { dispatchCurrency, dispatchNotifications, dispatchProfile } from 'app/reducer'
import axios from 'axios'
import { FiRefreshCcw } from "react-icons/fi";

const SideLinks = [
    { path: 'dashboard', url: '/user' },
    { path: 'savings', url: '/user/savings' },
    { path: 'external transfer', url: '/user/external-transfer' },
    { path: 'internal transfer', url: '/user/internal-transfer' },
    { path: 'transactions', url: '/user/transactions' },
    { path: 'notifications', url: '/user/notifications' },
    { path: 'profile', url: '/user/profile' },
]

const TicketFolder = [
    {
        name: 'tickets',
        icon: <BsChevronDoubleDown />
    }
]
const ticketsArr = [
    { path: 'create tickets', url: 'create' },
    { path: 'active tickets', url: 'active' },
    { path: 'closed tickets', url: 'closed' },
]

const SideLinks2 = [
    { path: 'settings', url: '/user/settings' },
    { path: 'logout', url: '' },
]

export default function UserSidebar({ setOpenSide, smallView = false }) {
    const location = useLocation()
    const dispatch = useDispatch()
    const [viewall, setViewAll] = useState(false)
    const [logout, setLogout] = useState(false)
    const [hide, setHide] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const navigate = useNavigate()
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
        } else if (smallView) {
            setViewAll(false)
            setOpenSide(false)
        }
        else {
            setViewAll(false)
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


    const profile = useSelector((state) => state.profile.profile)
    const currency = useSelector((state) => state.profile.currency)

    const fetchUserProfile = useCallback(async () => {
        setIsRotating(true)
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status === 200) {
                dispatch(dispatchProfile(response.data));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        } finally {
            setIsRotating(false)
        }
    }, [dispatch]);



    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);


    let firstChar = profile?.firstname?.substring(0, 1)
    let lastChar = profile?.lastname?.substring(0, 1)

    const containerRef = useRef(null)


    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    useEffect(() => {
        if (viewall && containerRef) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [viewall])

    const closeDiv = () => {
        setViewAll(false)
        setOpenSide(false)
    }

    const closeUp = () => {
        if (smallView) {
            setOpenSide(false)
        }
    }
    return (
        <div>
            <div className="flex flex-col px-3 h-[90dvh]">
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
                            <FiRefreshCcw className={`text-sm cursor-pointer ${isRotating ? 'rotating' : ''}`} />
                        </div>
                        <div className="flex items-center ">
                            <span>{currency}</span>
                            <span>{hide ? '***' : profile?.balance?.toLocaleString()}</span>
                        </div>
                        <IoEyeOutline onClick={() => setHide(prev => !prev)} className='text-sm self-center ml-2 cursor-pointer' />
                    </div>
                </div>
                <div ref={containerRef} className={` ${viewall ? ' transition-all delay-500 h-[30rem]' : 'h-40rem'} scroll w-full overflow-y-auto overflow-x-hidden flex items-start  flex-col`}>
                    {SideLinks.map((item, index) => (
                        <Link to={item.url}
                            key={index}
                            onClick={closeDiv}
                            className={`text-sm rounded-lg w-full hover:scale-10 text-slate-200 hover:text-orange-200 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} hover:translate-x-2 px-3 mb-3 py-2 font-extralight capitalize transition-all`}>
                            {item.path}
                        </Link>
                    ))}

                    {TicketFolder.map((item, index) => (
                        <div key={index}
                            onClick={() => setViewAll(prev => !prev)}
                            className={`text-sm mb-2 cursor-pointer  w-full hover:scale-10 flex items-center justify-between text-slate-200 hover:text-orange-200 ${viewall ? 'border-b-white border-b' : ''} px-3 mb py-2 font-extralight capitalize transition-all`}>
                            <div className="">{item.name}</div>
                            <div className="animate-bounce"> {item.icon} </div>

                        </div>
                    ))}
                    {viewall && ticketsArr.map((item, index) => (
                        <Link
                            to={`/user/tickets?status=${encodeURIComponent(item.url)}`}
                            onClick={closeUp}
                            key={index}
                            className={`text-sm rounded-lg  first:mt-2 w-full hover:scale-10 text-slate-200 hover:text-orange-200 ${item.url === status ? 'bg-slate-100/40' : ''} hover:translate-x-2 px-3 mb-3 py-2 font-extralight capitalize transition-all`}>
                            {item.path}
                        </Link>
                    ))}

                    <div className="flex flex-col w-full mt- mb-3">
                        {SideLinks2.map((item, index) => (
                            <Link to={item.url} onClick={() => logOut(item)} key={index}
                                className={`text-sm rounded-lg flex items-center justify-between  hover:scale-10 text-slate-200 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} hover:text-orange-200 px-3 mb-2 py-2 hover:translate-x-2 font-extralight capitalize transition-all`}>
                                <div className="">{item.path}</div>
                                <div className=""></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
