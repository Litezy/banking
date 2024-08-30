import { Box, LinearProgress } from '@mui/material';
import { dispatchCurrency, dispatchNotifications, dispatchProfile } from 'app/reducer';
import UserSidebar from 'components/user/UserSidebar';
import Userfooter from 'components/user/Userfooter';
import VerifyEmailAccount from 'forms/VerifyEmail';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineScan } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa6';
import { IoCopy } from 'react-icons/io5';
import { TbHeadset } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Apis, GetApi, profileImg } from 'services/Api';
import { errorMessage, successMessage } from 'utils/functions';
import { HiOutlineBars3BottomRight } from "react-icons/hi2";


export default function UserLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const [openside, setOpenSide] = useState(false)
    const [profile, setProfile] = useState({})
    const dispatch = useDispatch()
    const [notice, setNotice] = useState([])
    const navigate = useNavigate()
    const refdiv = useRef(null)
    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status === 200) {
                setProfile(response.data);
                dispatch(dispatchProfile(response.data));
                dispatch(dispatchCurrency(response.data?.currency));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    }, [dispatch]);


    useEffect(() => {
        fetchUserProfile()
    }, [fetchUserProfile])

    const fetchUserNotifications = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.user_notifications)
            if (response.status !== 200) return;
            const filter = response.data.filter((item) => item.status === 'unread')
            setNotice(filter)
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    }, [])

    useEffect(() => {
        fetchUserNotifications()
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    useEffect(() => {
        if (refdiv) {
            window.addEventListener('click', (e) => {
                if (refdiv.current !== null && !refdiv.current.contains(e.target)) return setOpenSide(false)
            }, true)
        }
    }, [])


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
            {profile?.verified === 'false' &&
                <VerifyEmailAccount />
            }
            {profile?.verified === 'true' &&
                <div className="flex items-center h-screen  bg-white">
                    <div className="h-screen hidden lg:block lg:w-[20%] bg-gradient-to-tr from-primary to-purple-700 text-white">
                        <UserSidebar />
                    </div>
                    <div className="bg-slate-50 lg:w-[80%] h-screen overflow-y-auto w-full relative">
                        <div className="lg:w-[78.8%]  w-[100%] bg-white flex z-50 items-center overflow-y-hidden overflow-x-hidden justify-between fixed  h-fit px-5 py-2">
                            <div className="flex items-center gap-5 w-1/2">
                                <div onClick={() => navigate(`/user/profile`)} className="cursor-pointer">
                                    {profile?.image ? <img src={`${profileImg}/profiles/${profile?.image}`} className='w-14 h-14 rounded-full object-cover' alt="" /> :
                                        <div className="flex items-center justify-center rounded-full h-14 w-14 border">
                                            <FaUser className='text-3xl' />
                                        </div>
                                    }
                                </div>
                                <div className="font-semibold text-base">Hi, Welcome back</div>
                            </div>
                            <div className="w-1/2 ">
                                <div className="text-2xl hidden  md:flex items-center justify-end gap-5">
                                    <Link to={`/user/tickets?status=active`}>
                                        <TbHeadset />
                                    </Link>
                                    <Link to="">
                                        <AiOutlineScan />
                                    </Link>
                                    <Link to="/user/notifications" className='relative'>
                                        {notice && notice.length > 0 && <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white absolute top-0 right-0 shadow-lg"></div>}
                                        <BsBell />
                                    </Link>
                                </div>
                                <div className="md:hidden w-fit ml-auto">
                                    <HiOutlineBars3BottomRight onClick={() => setOpenSide(prev => !prev)} className='text-4xl cursor-pointer font-bold' />
                                </div>
                            </div>


                        </div>
                        {openside &&
                            <div ref={refdiv} className="w-[55%] rounded-s-lg z-50 top-0  right-0 bg-gradient-to-tr from-primary to-purple-700 h-screen fixed">
                                <UserSidebar setOpenSide={setOpenSide} />

                            </div>
                        }
                        <div className="h-fit mt-10 overflow-x-hidden pb-10 pt-5">
                            {children}
                        </div>


                    </div>
                </div>}
        </div>
    )
}
