import React, { useState } from "react";
import { PiX } from "react-icons/pi";
import { SlClock, SlEarphonesAlt, SlEnvolope, SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
import logo from 'assets/logo.png'
import { SiteContact, SiteEmail, SiteName } from "utils/functions";

const HeadNavs = [
  { title: "home", url: "/" },
  { title: "services", url: "/services" },
  { title: "contact us", url: "/contact-us" },
  { title: "about us", url: "/about-us" },
];
export default function Header() {
    const [views, setViews] = useState(false)
    const BarIcon = views ? PiX : SlMenu
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-tr from-primary to-purple-700 text-white flex items-center flex-col lg:flex-row justify-around text-sm p-2">
        <div className="flex items-center gap-2">
          {" "}
          <SlClock /> Working hours: 24/7
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <SlEnvolope /> {SiteEmail}
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <SlEarphonesAlt /> {SiteContact}
        </div>
      </div>
      <div className="flex items-center justify-around p-2">
        <div className="">
          <Link to="/" className="">
            <img src={logo} alt="" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-end">
          {HeadNavs.map((item, index) => (
            <Link
              key={index}
              to={`${item.url}`}
              className="px-3 capitalize hover:text-orange-500 transition-all"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex flex-row items-center gap-5">
          <Link
            to="/login"
            className="px-8 py-1.5 truncate rounded-lg w-full items-center flex justify-center capitalize hover:text-orange-300 bg-gradient-to-tr from-primary to-purple-700 text-white transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-1.5 truncate rounded-lg w-full items-center flex justify-center capitalize hover:text-orange-300 transition-all bg-gradient-to-tr from-primary to-purple-700 text-white"
          >
            Sign up
          </Link>
        </div>
        <div onClick={() => setViews(prev => !prev)} className="lg:hidden text-2xl cursor-pointer">
          {" "}
          <BarIcon />{" "}
        </div>
      </div>
      <div className={`${views ? 'h-[20rem]' : 'h-0'} transition-all overflow-hidden`}>
        <div className="flex lg:hidden flex-col justify-end">
          {HeadNavs.map((item, index) => (
            <Link
              key={index}
              to={`${item.url}`}
              className="px-3 py-3 capitalize hover:text-orange-500 transition-all"
            >
              {item.title}
            </Link>
          ))}
          <Link
            to={`/login`}
            className="px-3 py-3 capitalize hover:text-orange-500 transition-all"
          >
            Login
          </Link>
          <Link
            to={`/signup`}
            className="px-3 py-3 capitalize hover:text-orange-500 transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
