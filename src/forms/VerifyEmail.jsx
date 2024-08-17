import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Apis, ClientPostApi, PostApi } from 'services/Api'
import CountryStates from 'utils/CountryStates'
import DailOptions from 'utils/DailOption'
import Formbutton from 'utils/Formbutton'
import Forminput from 'utils/Forminput'
import { errorMessage, successMessage } from 'utils/functions'
import Loader from 'utils/Loader'
import OtpForm from 'utils/OtpForm'

export default function VerifyEmailAccount() {
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [countdown,setCoundown] = useState(0)
    const [pins, setPins] = React.useState(['', '', '', '']);
    const email = searchParams.get('email')
    const profile = useSelector((state) => state.profile.profile)

    const setup = (val) => {
        setPins(val)
    }


    useEffect(() => {
        let timer;
        if (btnDisabled) {
            timer = setInterval(() => {
                setCoundown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        setBtnDisabled(false)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000)
        }

        return () => clearInterval(timer)
    }, [btnDisabled])


    const navigate = useNavigate()
    const HandleSubmission = async e => {
        e.preventDefault()
        if(profile?.email){
            const form = {
                code: pins.join('')
            }
            const formdata = {
                email: profile?.email,
                reset_code: form.code
            }
            setLoading(true)
            try {
                const res = await PostApi(Apis.non_auth.verify_email, formdata)
                if (res.status === 200) {
                    successMessage(res.msg)
                    navigate(`/login`)
                } else {
                    errorMessage(res.msg)
                }
            } catch (error) {
                errorMessage(error.message)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }else{
            const form = {
                code: pins.join('')
            }
            const formdata = {
                email: email,
                reset_code: form.code
            }
            setLoading(true)
            try {
                const res = await PostApi(Apis.non_auth.verify_email, formdata)
                if (res.status === 200) {
                    successMessage(res.msg)
                    navigate(`/login`)
                } else {
                    errorMessage(res.msg)
                }
            } catch (error) {
                errorMessage(error.message)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

    }

    const RequestOtp = async (e) => {
        e.preventDefault()
        const formData = {
            email: profile?.email
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.non_auth.resend_otp, formData)
            if (response.status === 200) {
                successMessage(response.msg)
                setBtnDisabled(true)
                setCoundown(60)
            } else {
                errorMessage(response.msg)
            }

        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-gradient-to-tr from-primary to-purple-700 h-screen overflow-x-hidden flex items-center justify-center'>
            <div className="w-[97%] mx-auto max-w-xl bg-white relative backdrop-blur-sm p-5 rounded-lg mt-10 lg:mt-20">

                {loading &&
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 ">
                        <Loader />
                    </div>
                }
                <div className="text-3xl lg:text-4xl font-bold text-primary">Verify your Email Address</div>
                <div className="">Lets assist you recover your account</div>
                <form onSubmit={HandleSubmission} className='mt-5'>
                    <div className="mb-10">
                        <OtpForm
                            pins={pins}
                            setPins={setPins}
                            setup={setup}
                        />
                    </div>
                    <Formbutton label="Verify my email" loading={false} />
                    <div className="flex items-center justify-between mt-5">
                        <div className="">
                            <div className="text-zinc-500 mt-5 text-center">Don't have an account? <Link to="/signup" className='text-blue-600'>Create Account</Link> </div>
                            <div className="text-zinc-500 mt-3 text-center"><Link to="/" className='text-blue-600'>Go back home</Link> </div>
                        </div>
                        <div className="flex items-center flex-col gap-2">
                            <div className="">didn't receive email?</div>
                            {btnDisabled && <div className="w-fit text-xs font-bold  flex items-center gap-1 flex-col">
                                <div className="">request again in:</div>
                                <div className="text-primary">{countdown} s</div>
                            </div>}
                            <button onClick={RequestOtp} disabled={btnDisabled ? true :false} className='w-fit px-3 py-1 rounded-full bg-primary text-white'>resend</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
