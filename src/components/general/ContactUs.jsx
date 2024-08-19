import React, { useState } from 'react'
import { CiMail } from 'react-icons/ci'
import { FaFacebookF, FaInstagram, FaLocationArrow, FaPinterestP, FaXTwitter } from 'react-icons/fa6'
import { FiPhoneIncoming, FiPrinter } from 'react-icons/fi'
import { FaAsterisk } from "react-icons/fa";
import { errorMessage, SiteAddress, SiteContact, SiteEmail, successMessage } from 'utils/functions';
import { Apis, ClientPostApi } from 'services/Api';

const ContactUs = () => {

    const links = [
        {
            img: <CiMail />,
            title: 'Mail',
            desc: SiteEmail
        },
        {
            img: < FiPhoneIncoming />,
            title: 'Phone',
            desc: SiteContact
        },
        {
            img: <FiPrinter />,
            title: 'Fax',
            desc: SiteContact
        },
        {
            img: <FaLocationArrow />,
            title: 'Office',
            desc: SiteAddress
        },
    ]


    const socials = [
        {
            img: <FaInstagram />
        },
        {
            img: <FaXTwitter />
        },
        {
            img: <FaFacebookF />
        },
        {
            img: <FaPinterestP />
        },
    ]

    const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const SubmitForm = async (e) => {
    e.preventDefault()
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (forms.email) {
      if (!isValidEmail(forms.email)) return errorMessage('Invalid email')
    }
    if (!forms.message) return errorMessage('Message is missing')
    const formdata = {
      name: forms.name,
      email: forms.email,
      message: forms.message
    }
    setLoading(true)
    try {
      const res = await ClientPostApi(Apis.non_auth.contact_us, formdata)
      if (res.status === 200) {
        successMessage(`Message sent successfully`)
        setForms({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        errorMessage(`something went wrong`)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='my-10'>
         <div className="w-full h-full border-t-2 border-primary pt-5 lg:pt-0 lg:border-none ">
                <div className="w-11/12 mx-auto">
                    <div className="flex items-start flex-col lg:flex-row lg:gap-10 w-full">
                        <div className="lg:w-1/2 text-dark flex items-start flex-col gap-6 h-fit pb-10">
                            <div className="font-bold  text-4xl">Get in touch</div>
                            <div className="font-semibold">We're here for you every step of the way. Wether you have questions, need help , or want to share feedback, our friendly customer support team is ready to assist. Our team is here to reach out! Reach out to us via</div>
                            <div className="w-full">
                                {links.map((item, i) => {
                                    return (
                                        <div className="flex items-center gap-2 mb-10" key={i}>
                                            <div className={`${item.title === 'Mail' ? 'bg-[#fff0e6] text-[#ff6b0c]' : item.title === 'Phone' ? 'bg-[#ebeeff] text-[#294bff]' : item.title === 'Fax' ? 'bg-[#f4eefa] text-[#a674d9]' : 'bg-[#e7f7ef] text-[#65cd98]'}
                                 w-fit px-3 py-2 rounded-xl text-4xl`}>
                                                {item.img}</div>
                                            <div className="flex items-start flex-col">
                                                <div className="text-sm font-semibold">{item.title}</div>
                                                <div className="font-bold">{item.desc}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="lg:w-1/2 w-full bg-gradient-to-tr from-primary to-purple-700 h-fit rounded-2xl text-white">
                            <div className="h-full py-10 px-2">
                                <div className="w-full flex items-center justify-center flex-col">
                                    <div className="w-full text-center text-3xl lg:text-4xl font-bold ">Send us a message</div>
                                    <div className="text-center lg:w-[60%]">Your email address will not be published. Required fields are marked</div>
                                </div>

                                <div className="mt-5  w-11/12 mx-auto">
                                    <form onSubmit={SubmitForm} className='w-full  flex-col flex items-start gap-5'>
                                        <div className="flex w-full items-start gap-2 flex-col">
                                            <div className="font-bold">Full Name</div>
                                        <input 
                                        type='text' 
                                        className='w-full h-10 text-slate-900 bg-white pl-4 outline-none lg:h-14 rounded-md ' 
                                        placeholder='full name'
                                        name='name'
                                         value={forms.name}
                                         onChange={handleChange}
                                        />
                                        </div>
                                        <div className="flex w-full items-start gap-2 flex-col">
                                        <div className="w-full flex items-center justify-between">
                                           <div className="font-bold">Email Address</div>
                                           <FaAsterisk className='text-sm text-white'/>
                                           </div>
                                        <input type='email'
                                         className='w-full bg-white pl-4 text-slate-900 outline-none h-10 lg:h-14 rounded-md ' 
                                         placeholder='email address'
                                         name='email'
                                         value={forms.email}
                                         onChange={handleChange}
                                         />
                                        </div>
                                       
                                        <div className="flex w-full items-start gap-2 flex-col">
                                           <div className="w-full flex items-center justify-between">
                                           <div className="font-bold">Message</div>
                                           <FaAsterisk className='text-sm text-white'/>
                                           </div>
                                        <textarea 
                                        className='w-full h-40 py-2 pr-2 text-slate-900 resize-none bg-white pl-4 outline-none  rounded-md' 
                                        placeholder='message'
                                        name='message'
                                         value={forms.message}
                                         onChange={handleChange}
                                        ></textarea>
                                        </div>
                                        <button className='w-full py-3 rounded-lg text-black font-bold text-center bg-white text-lg'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    </div>
  )
}

export default ContactUs