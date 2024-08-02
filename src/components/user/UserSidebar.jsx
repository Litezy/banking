import React, { useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Apis, PostApi } from 'services/Api'
import { CookieName, Currency, errorMessage, successMessage } from 'utils/functions'
import ModalLayout from 'utils/ModalLayout'
import Cookies from 'js-cookie'

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
    const [logout, setLogout] = useState(false)
    const navigate = useNavigate()
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
        }
    }

    const LogoutUset = async () => {
        try {
            const response = await PostApi(Apis.auth.logout)
            console.log(response)
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
    return (
        <div>
            <div className="flex flex-col px-3 h-[80dvh]">
                {logout &&
                    <ModalLayout setModal={setLogout} clas={`w-[35%] mx-auto`}>
                        <div className="bg-white py-5 px-3 h-fit flex-col text-black rounded-md flex items-center justify-center">
                            <div className="text-xl font-semibold self-center">Confirm Logout</div>
                            <div className="flex items-center justify-between w-full">
                                <button onClick={() => setLogout(false)} className='w-fit text-white px-4 py-2 rounded-lg bg-red-500'>cancel</button>
                                <button onClick={LogoutUset} className='w-fit text-white px-4 py-2 rounded-lg bg-green-500'>confirm</button>
                            </div>
                        </div>
                    </ModalLayout>
                }
                <div className="bg-slate-100/20 rounded-lg p-3 flex flex-col items-center justify-center gap-3 mt-6 mb-5">
                    <div className="py-3 px-3.5 rounded-full text-white bg-gradient-to-tr from-primary to-purple-700 w-fit h-fit uppercase">DB</div>
                    <div className="text-white text-center text-sm">{profile?.firstname} {profile?.lastname}</div>
                    <div className="text-white font-bold text-xl flex justify-center"> <span className='text-sm self-end'>{currency}</span>{profile?.balance} <IoEyeOutline className='text-sm self-center ml-2' /> </div>
                </div>
                {SideLinks.map((item, index) => (
                    <Link to={item.url} key={index} className={`text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} px-3 mb py-3 font-extralight capitalize transition-all`}>
                        {item.path}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col px-3 mt-2">
                {SideLinks2.map((item, index) => (
                    <Link to={item.url} onClick={() => logOut(item)} key={index} className="text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 px-3 py-3 font-extralight capitalize transition-all">
                        {item.path}
                    </Link>
                ))}
            </div>
        </div>
    )
}
