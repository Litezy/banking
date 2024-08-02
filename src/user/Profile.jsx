import React from 'react'
import { CiUser } from "react-icons/ci";
import ButtonComponent from 'utils/ButtonComponent';
import FormComponent from 'utils/FormComponent';
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    return (
        <div className='w-full lg:mt-10 mt-5'>
            <div className="w-11/12 mx-auto">
                <div className="text-2xl font-semibold">Personal Account</div>

                <div className="my-10 flex items-start flex-col lg:flex-row gap-10 ">
                    <div className="md:w-1/2 w-full px-3 py-5 h-fit bg-white shadow-lg rounded-md">
                        <div className="w-full">
                            <div className="mb-2 text-xl font-light">Edit Account</div>
                            <div className="w-fit cursor-pointer p-10 rounded-md flex border border-gray text-center ">
                                <CiUser className='text-5xl ' />
                                <FaEdit className='text-2xl'/>
                            </div>
                            <div className="mt-5 w-full flex items-start flex-col gap-5">
                                <div className="flex items-start w-full  justify-between gap-5">
                                    <div className="flex items-start flex-col gap-1 lg:w-1/2 w-full">
                                        <div className="">First Name</div>
                                        <FormComponent />
                                    </div>
                                    <div className="flex items-start flex-col gap-1 lg:w-1/2 w-full">
                                        <div className="">Last Name</div>
                                        <FormComponent />
                                    </div>
                                </div>
                                <div className="flex items-start w-full justify-between gap-5">
                                    <div className="flex items-start flex-col gap-1 lg:w-1/2 w-full">
                                        <div className="">Phone Number</div>
                                        <FormComponent formtype='phone' />
                                    </div>
                                    <div className="flex items-start flex-col gap-1 lg:w-1/2 w-full">
                                        <div className="">Username</div>
                                        <FormComponent />
                                    </div>
                                </div>
                                <div className="flex items-start w-full justify-between gap-5">
                                    <div className="flex items-start flex-col gap-1 lg:w-1/2 w-full">
                                        <div className="">Country</div>
                                        <FormComponent formtype='phone' />
                                    </div>

                                </div>
                            </div>
                            <ButtonComponent title={`Save Details`} bg={`bg-primary h-12 text-white mt-5`} />
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full h-fit pb-5  px-3 bg-white rounded-md">
                        <div className="mt-5 w-full flex items-start flex-col gap-5">
                            <div className="text-xl font-light ">Account Information</div>
                            <div className="flex items-start flex-col w-full justify-between gap-5">
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">First Name</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Last Name</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Username</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Address</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-1/4 ">
                                    <div className="">Sex</div>
                                    <FormComponent formtype='sex' placeholder={'Male'} />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Phone Number</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Address</div>
                                    <FormComponent />
                                </div>
                                <div className="flex items-start flex-col w-full ">
                                    <div className="">Country</div>
                                    <FormComponent />
                                </div>
                                <div className="mt-5 w-full">
                                    <ButtonComponent title={'Delete Account'} bg={`bg-red-600 text-white h-14`}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile