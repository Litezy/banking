import React from 'react'
import { Link } from 'react-router-dom'
import CountryStates from 'utils/CountryStates'
import DailOptions from 'utils/DailOption'
import Formbutton from 'utils/Formbutton'
import Forminput from 'utils/Forminput'
import OtpForm from 'utils/OtpForm'

export default function VerifyEmailAccount() {
    const [pins, setPins] = React.useState(['', '', '', '']);

    const setup = (val) => {
        setPins(val)
    }

    const HandleSubmission = async e => {
        e.preventDefault()
        const form = {
            code: pins.join('')
        }
        console.log(form);
    }

    return (
        <div className='bg-gradient-to-tr from-primary to-purple-700 h-screen overflow-x-hidden flex items-center justify-center'>
            <div className="w-[97%] mx-auto max-w-xl bg-white backdrop-blur-sm p-5 rounded-lg mt-10 lg:mt-20">
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
                    <div className="text-zinc-500 mt-5 text-center">Don't have an account? <Link to="/signup" className='text-blue-600'>Create Account</Link> </div>
                    <div className="text-zinc-500 mt-3 text-center"><Link to="/" className='text-blue-600'>Go back home</Link> </div>
                </form>
            </div>
        </div>
    )
}
