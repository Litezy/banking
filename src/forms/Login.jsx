import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from 'utils/ButtonComponent'
import FormComponent from 'utils/FormComponent'
import Forminput from 'utils/Forminput'
import { CookieName, errorMessage, successMessage, UserRole } from 'utils/functions'
import Cookies from 'js-cookie'
import { Apis, PostApi } from 'services/Api'
import { decodeToken } from 'react-jwt'
import Loader from 'utils/Loader'

export default function Login() {

    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }


    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const LoginAcc = async (e) => {
        e.preventDefault()
        if (!forms.email) return errorMessage('Email address is required')
        if (!isValidEmail(forms.email)) return errorMessage('Please input a valid email')
        if (!forms.password) return errorMessage('Password is required')
        const formdata = {
            email: forms.email,
            password: forms.password
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.non_auth.login, formdata)
            if (response.status === 200) {
                Cookies.set(CookieName, response.token,)
                successMessage(response.msg)
                const decoded = decodeToken(response.token)
                const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
                if (findUserRole) {
                    navigate(findUserRole.url)
                }
            }
            else {
                errorMessage(response.msg)
            }
        }
        catch (error) {
            return errorMessage(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='bg-gradient-to-tr from-primary to-purple-700 h-screen overflow-x-hidden flex items-center justify-center'>
            <div className="w-[97%] mx-auto max-w-xl bg-white backdrop-blur-sm p-5 relative rounded-lg mt-10 lg:mt-20">

                {loading && 
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                    <Loader/>
                </div>
                }
                <div className="text-3xl lg:text-4xl font-bold text-primary">Login Account</div>
                <form onSubmit={LoginAcc} className='mt-5 flex items-start gap-4 flex-col'>
                    <FormComponent formtype="email" name={`email`} value={forms.email} onchange={handleChange} placeholder="Email Address" />
                    <FormComponent formtype="password" name={`password`} value={forms.password} onchange={handleChange} placeholder="Password" />
                    <div className="grid grid-cols-2 gap-4 items-center mb-3">
                        <Forminput formtype="checkbox" placeholder="Remember me" />
                        <div className="text-right">
                            <Link to="/forgot-password" className='text-blue-600'>Forgot Password?</Link>
                        </div>
                    </div>
                    <ButtonComponent bg={`bg-primary text-white h-12`} title="Login Account" />
                    <div className="text-zinc-500 mt-5 text-center">Don't have an account? <Link to="/signup" className='text-blue-600'>Create Account</Link> </div>
                    <div className="text-zinc-500 mt-3 text-center"><Link to="/" className='text-blue-600'>Go back home</Link> </div>
                </form>
            </div>
        </div>
    )
}
