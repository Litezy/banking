import React from 'react'
import { Link } from 'react-router-dom'
import CountryStates from 'utils/CountryStates'
import DailOptions from 'utils/DailOption'
import Formbutton from 'utils/Formbutton'
import Forminput from 'utils/Forminput'

export default function ChangePassword() {

    const setup = () => {
        //
    }

    const handleCountry = () => {
        //
    }
    return (
        <div className='bg-gradient-to-tr from-primary to-purple-700 h-screen overflow-x-hidden flex items-center justify-center'>
            <div className="w-[97%] mx-auto max-w-xl bg-white backdrop-blur-sm p-5 rounded-lg mt-10 lg:mt-20">
                <div className="text-3xl lg:text-4xl font-bold text-primary">Change Password</div>
                <div className="">Lets assist you recover your account</div>
                <form className='mt-5'>
                    <Forminput formtype="password" label="Password" />
                    <Forminput formtype="password" label="Confirm Password" />
                    <Formbutton label="Change password" loading={true} />
                    <div className="text-zinc-500 mt-5 text-center">Don't have an account? <Link to="/signup" className='text-blue-600'>Create Account</Link> </div>
                    <div className="text-zinc-500 mt-3 text-center"><Link to="/" className='text-blue-600'>Go back home</Link> </div>
                </form>
            </div>
        </div>
    )
}
