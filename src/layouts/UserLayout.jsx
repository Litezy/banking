import { Box, LinearProgress } from '@mui/material';
import { dispatchProfile } from 'app/reducer';
import UserSidebar from 'components/user/UserSidebar';
import Userfooter from 'components/user/Userfooter';
import VerifyEmailAccount from 'forms/VerifyEmail';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Apis, GetApi } from 'services/Api';
import { errorMessage } from 'utils/functions';

export default function UserLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const [profile,setProfile] = useState({})
    const dispatch = useDispatch()

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


    useEffect(()=>{
        fetchUserProfile()
    },[fetchUserProfile])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
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
           {profile?.verified === 'true'  && <div className="flex items-center h-screen overflow-hidden bg-white">
                <div className="h-screen hidden lg:block w-[20%] bg-gradient-to-tr from-primary to-purple-700 text-white">
                    <UserSidebar />
                </div>
                <div className="bg-slate-50 h-screen w-full overflow-y-auto overflow-x-hidden">
                    <div className="h-[97dvh] overflow-y-auto overflow-x-hidden pb-20">
                        {children}
                    </div>
                    <Userfooter />

                </div>
            </div>}
        </div>
    )
}
