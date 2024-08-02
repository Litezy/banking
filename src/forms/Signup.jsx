import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from 'utils/ButtonComponent';
import CountryStates from 'utils/CountryStates';
import DailOptions from 'utils/DailOption';
import Formbutton from 'utils/Formbutton';
import FormComponent from 'utils/FormComponent';
import Forminput from 'utils/Forminput';

export default function Signup() {
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        dial_code: '',
        email: '',
        country: '',
        state: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value,
        });
    };

    const handleCountryChange = (data) => {
        setForms({
            ...forms,
            country: data.country,
            state: data.state,
        });
    };

    const handleDialCodeChange = (val) => {
        setForms({
            ...forms,
            dial_code: val.dial_code,
        });
    };

    const submitForms = (e) => {
        e.preventDefault();
        console.log(forms);
    };

    return (
        <div className='bg-gradient-to-tr from-primary to-purple-700 h-screen overflow-x-hidden'>
            <div className="w-[97%] mx-auto max-w-xl bg-white backdrop-blur-sm p-5 rounded-lg my-10 lg:my-20">
                <div className="text-3xl lg:text-4xl font-bold text-primary">Create Account</div>
                <form onSubmit={submitForms} className="mt-5 flex flex-col gap-3">
                    <FormComponent
                        formtype="text"
                        placeholder="First Name"
                        name="firstname"
                        value={forms.firstname}
                        onchange={handleChange}
                    />
                    <div className="grid grid-cols-7 gap-1 lg:gap-5">
                        <div className="col-span-5">
                            <FormComponent
                                formtype="text"
                                placeholder="Last Name"
                                name="lastname"
                                value={forms.lastname}
                                onchange={handleChange}
                            />
                        </div>
                        <div className="col-span-2">
                            <label>
                                <select
                                    className="w-full cursor-pointer outline-none h-12 rounded-md border"
                                    name="gender"
                                    onChange={handleChange}
                                    value={forms.gender}
                                >
                                    <option value="">--select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 lg:gap-3">
                        <div className="col-span-2">
                            <DailOptions title="+234" />
                        </div>
                        <div className="col-span-5">
                            <FormComponent
                                formtype="text"
                                placeholder="Phone Number"
                                name="phone"
                                value={forms.phone}
                                onchange={handleDialCodeChange}
                            />
                        </div>
                    </div>
                    <FormComponent
                        formtype="text"
                        placeholder="Email Address"
                        name="email"
                        value={forms.email}
                        onchange={handleChange}
                    />
                    <CountryStates onChange={handleCountryChange} />
                    <FormComponent
                        formtype="password"
                        placeholder="Password"
                        name="password"
                        value={forms.password}
                        onchange={handleChange}
                    />
                    <FormComponent
                        formtype="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        value={forms.confirm_password}
                        onchange={handleChange}
                    />
                    <FormComponent
                        formtype="checkbox"
                        placeholder="Confirm you agree to our terms and policies."
                        name="terms"
                        value={forms.terms}
                        onchange={handleChange}
                    />
                    <ButtonComponent bg="bg-primary h-12 text-white" title="Create Account" />
                    <div className="text-zinc-500 mt-5 text-center">
                        Already have an account? <Link to="/login" className="text-blue-600">Login Account</Link>
                    </div>
                    <div className="text-zinc-500 mt-3 text-center">
                        <Link to="/" className="text-blue-600">Go back home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}