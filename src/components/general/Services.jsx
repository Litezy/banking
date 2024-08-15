import { SiteName } from 'utils/functions'
import React from 'react'
import { services } from 'utils/Pageutils'
import FAQ from './FAQ'

const Services = () => {
    return (
        <div className='mt-10 mb-10'>
            <div className="lg:w-10/12 w-11/12 mx-auto mb-20">
                <div className="text-center font-bold text-3xl lg:text-4xl">Our Services</div>
                <div className="text-sm text-center text-slate-600">
                    At {SiteName}, we are dedicated to providing you with a banking experience that’s not just secure and reliable but also tailored to meet your financial goals. Our innovative services are designed to simplify your life, empower your savings, and enhance your financial freedom. Explore the array of services we offer to help you manage, grow, and protect your money with ease and confidence.
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-10  relative mt-10 w-11/12 mx-auto lg:w-10/12 mb-20">
                {services.map((item, index) => (
                    <div className="bg-white rounded-lg transition-all hover:-translate-y-3 cursor-pointer duration-300 p-5 h-[20rem] shadow-2xl" key={index}>
                        <div className="text-4xl lg:text-5xl w-fit mx-auto bg-gradient-to-tr from-primary to-purple-700 -mt-10 p-3 rounded-lg text-white"> {item.icon} </div>
                        <div className="font-bold text-center text-2xl mb-10 mt-5 text-purple-900">{item.title}</div>
                        <div className="text-center">{item.desc}</div>
                    </div>
                ))}
            </div>
            <div className="w-11/12 mx-auto lg:w-10/12 mb-20">
                <div className="w-fit mx-auto mb-10 font-bold text-3xl lg:text-4xl">
                    <div className="bg-zinc-500 h-1 w-3/5 mt-3 ml-auto"></div>
                    <div className="">
                        <div className="text-center">Got Questions? We've Got answers</div>
                    </div>
                    <div className="bg-zinc-500 h-1 w-3/5 mt-3"></div>
                </div>
                <div className="faq rounded-xl py-2 px-5 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="">
                    </div>
                    <div className="w-full bg-white backdrop-blur-md rounded-s-md">
                        <FAQ />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Services