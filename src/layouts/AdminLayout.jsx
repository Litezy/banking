import { Box, LinearProgress } from '@mui/material';
import AdminSideBar from 'admin/adminComponents/AdminSideBar';
import Userfooter from 'components/user/Userfooter';
import { FaBars } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from 'react'
import { GrClose } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Apis, PostApi } from 'services/Api';
import ModalLayout from 'utils/ModalLayout';
import { CookieName, errorMessage, successMessage } from 'utils/functions';
import Cookies from 'js-cookie';

export default function AdminLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const [side, setSide] = useState(false)
    const [logout, setLogout] = useState(false)
    const sideDiv = useRef(null)
    const navigate = useNavigate()

    const Icon = side ? GrClose : FaBars
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
            setSide(false)
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
    useEffect(() => {
        if (sideDiv) {
            window.addEventListener('click', e => {
                if (sideDiv.current !== null && !sideDiv.current.contains(e.target)) {
                    setSide(false)
                }
            }, true)
        }
    }, [])

    const SideLinks = [
        { path: 'overview', url: '/admin/overview' },
        { path: 'users', url: '/admin/users' },
        { path: 'transfers', url: '/admin/transfers' },
        { path: 'transactions', url: '/admin/transactions' },
        { path: 'verifications', url: '/admin/verifications' },
        { path: 'banks', url: '/admin/banks' },
        { path: 'newsletters', url: '/admin/newsletters' },
        { path: 'contacts', url: '/admin/contacts' },
    ]

    const SideLinks2 = [
        { path: 'logout', url: '' },
    ]
    const location = useLocation()
    if (loading) return (
        <div>
            <div className="flex items-center h-screen">
                <div className="hidden lg:block w-[23%] bg-white border-r h-full pt-10">
                    {new Array(10).fill(0).map((ele, index) => (
                        <div className="bg-slate-200 h-14 mb-2 w-11/12 mx-auto rounded-lg" key={index}></div>
                    ))}
                </div>
                <div className="w-full ml-auto bg-slate-100 h-screen">
                    <div className="flex items-center justify-between bg-white p-3">
                        <div className="">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                            <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-[91.1dvh] flex items-center w-4/5 max-w-xl mx-auto justify-center pb-10 overflow-y-auto">
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            <div className="flex items-center h-screen overflow-hidden bg-white">

                <div className="h-screen hidden lg:block w-[20%] bg-gradient-to-tr from-primary to-purple-700 text-white">
                    <AdminSideBar />
                </div>
                <div className="p-4 lg:hidden bg-primary text-white fixed z-50 w-full top-0 flex items-center justify-between">
                    <div onClick={() => setSide(prev => !prev)} className="">
                        <Icon className='text-3xl cursor-pointer' />
                    </div>
                    <div className="">Admin</div>
                </div>
                {side &&
                    <div ref={sideDiv} className="w-[40%] z-50 absolute py-5  gap-2 flex items-start justify-between  flex-col text-white bg-primary  h-full">
                        <div className="flex flex-col items-start p-2 mt-16 w-full">
                            {SideLinks.map((item, index) => (
                                <Link to={item.url} onClick={() => setSide(false)} key={index} className={`w-full text-sm rounded-lg hover:scale-105 text-slate-200 hover:bg-slate-100/20 ${item.url === location.pathname ? 'bg-slate-100/40' : ''} px-3 mb-3 py-2 font-extralight capitalize transition-all`}>
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
                }
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
                <div className="bg-slate-50 h-screen w-full mt-[8rem] lg:mt-0 overflow-y-auto overflow-x-hidden">
                    <div className="h-[97dvh] overflow-y-auto overflow-x-hidden pb-20">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
