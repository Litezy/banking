
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ModalLayout from 'utils/ModalLayout'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { Apis, GetApi, PostApi } from 'services/Api'
import { CookieName, errorMessage, successMessage } from 'utils/functions'
import { dispatchProfile } from 'app/reducer'

const AdminLinks = [
    { path: 'overview', url: '/admin/overview' },
    { path: 'users', url: '/admin/users' },
    { path: 'transfers', url: '/admin/transfers' },
    { path: 'transactions', url: '/admin/transactions' },
    { path: 'verifications', url: '/admin/verifications' },
    { path: 'banks', url: '/admin/banks' },
    { path: 'newsletters', url: '/admin/newsletters' },
    { path: 'contacts', url: '/admin/contacts' },
    { path: 'single-page', url: '/admin/verifications/:id' },
]

const AdminLinks2 = [
    { path: 'logout', url: '' },
]

export default function AdminSideBar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [logout, setLogout] = useState(false)
    const [profile, setProfile] = useState({})

    const navigate = useNavigate()
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
        }
    }

    const LogoutUser = async () => {
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

    const fetchUserProfile = useCallback(async () => {
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
        }
    }, [dispatch]);
    useEffect(() => {
        fetchUserProfile()
    }, [])

    let firstChar = profile?.firstname?.substring(0, 1)
    let lastChar = profile?.lastname?.substring(0, 1)

    return (
        <div>
            <div className="flex flex-col px-3 h-[80dvh]">
                {logout &&
                    <ModalLayout setModal={setLogout} clas={`w-[35%] mx-auto`}>
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
                    <div className="text-white text-center text-sm">{profile?.firstname} {profile?.lastname}</div>

                </div>
                {AdminLinks.map((item, index) => (
                    <Link to={item.url} key={index} className={`text-sm last:hidden  rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} px-3 mb-1 py-2 font-extralight capitalize transition-all`}>
                        {item.path}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col px-3 mt-2">
                {AdminLinks2.map((item, index) => (
                    <Link to={item.url} onClick={() => logOut(item)} key={index} className="text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 px-3 py-2 font-extralight capitalize transition-all">
                        {item.path}
                    </Link>
                ))}
            </div>
        </div>
    )
}


