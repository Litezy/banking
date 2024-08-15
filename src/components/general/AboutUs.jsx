import React from 'react'
import aboutusimg from '../../assets/aboutus.jpg'
import { SiteName } from 'utils/functions';
import FAQ from './FAQ';

const AboutUs = () => {

  const abouts = [
    {
      title: 'Low Transaction Fees',
      desc: 'We believe that your money should work for you, not the other way around. Enjoy some of the lowest transaction fees in the industry, ensuring more of your hard-earned money stays with you.'
    },
    {
      title: 'Seamless International Transfers',
      desc: 'Moving money across borders has never been easier. Our platform allows you to effortlessly send and receive funds globally, with transparent exchange rates and no hidden charges.'
    },
    {
      title: 'Personalized Savings Goals',
      desc: "Achieve your financial dreams with our customizable savings goals. Whether you're saving for a vacation, a new home, or an emergency fund, we help you stay on track with tailored plans and progress tracking."
    },
    {
      title: 'User-Friendly Interface',
      desc: "Managing your finances should be simple and intuitive. Our app is designed with you in mind, offering a seamless and user-friendly experience across all devices."
    },
    {
      title: '24/7 Customer Support',
      desc: "Whether you have a question or need assistance, our dedicated customer support team is available around the clock to help you navigate any challenges."
    },
  ]
  return (
    <>
    <div className="abt h-[20rem] lg:h-[30rem]"></div>
    <div className='w-11/12 mx-auto lg:w-10/12 mb-20'>
      <div className="lg:text-4xl text-3xl font-bold my-3">About Us</div>
      <div className="text-base text-slate-900 w-full 
      grid grid-cols-1 md:grid-cols-2  gap-10">
        <div className="rounded-md bg-white shadow-lg p-5 tracking-wide">
          At {SiteName}, we believe that banking should be more than just a transaction; it should be a partnership. Founded on the principles of trust, transparency, and innovation, we are committed to revolutionizing the way you manage your finances. Our mission is to empower individuals and businesses by providing them with the tools and resources they need to achieve financial success.
        </div>
        <div className="rounded-md bg-white shadow-lg p-5 tracking-wide">
          With a customer-first approach, we offer personalized banking solutions that cater to your unique needs. Whether you're saving for a dream, investing in your future, or simply managing your day-to-day expenses, we are here to support you every step of the way.
        </div>
        <div className="rounded-md bg-white shadow-lg p-5  tracking-wide">
          Our team of financial experts is dedicated to delivering exceptional service and cutting-edge technology to ensure your experience with us is seamless, secure, and rewarding. At {SiteName}, we don’t just manage money – we help you make the most of it.

          Join us on a journey to redefine banking, where your financial goals are our priority.
        </div>
      </div>

      <div className="mt-20 w-full flex flex-col lg:flex-row items-center gap-10">
        <div className="w-11/12 lg:w-1/2">
          <div className="lg:text-4xl text-3xl font-bold my-3">Why Us</div>
          <img src={aboutusimg} className='rounded-md' alt="" />
        </div>
        <div className="w-11/12 lg:w-1/2">
          <div className="p-10 bg-white shadow-lg  text-lg font-semibold tracking-wide ">At {SiteName}, we understand that your financial journey is unique, and we're here to support you every step of the way. Here’s why we stand out:</div>
        </div>
      </div>

      <div className="mt-10 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative gap-10">
        {abouts.map((item,i) =>(
          <div className="w-full p-10 rounded-md bg-white shadow-lg" key={i}>
            <div className="text-lg text-center font-bold mb-3">{item.title}</div>
            <div className="">{item.desc}</div>
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
    </>
  )
}

export default AboutUs