import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import { SlClock, SlEarphonesAlt, SlEnvolope } from "react-icons/sl";
import { Link } from "react-router-dom";
import { SiteContact, SiteEmail, SiteName } from "utils/functions";

const QuickLinks = [
  { title: "home", url: "" },
  { title: "services", url: "" },
  { title: "contact us", url: "" },
  { title: "about us", url: "" },
  { title: "faqs", url: "" },
];

const QuickLinks2 = [
  { title: "terms of services", url: "" },
  { title: "privacy policies", url: "" },
  { title: "cookies notice", url: "" },
];

const SocialMediaLinks = [
  { title: "facebook", url: "", Icon: BsFacebook },
  { title: "x", url: "", Icon: BsTwitterX },
  { title: "instagram", url: "", Icon: BsInstagram },
  { title: "whatsapp", url: "", Icon: BsWhatsapp },
];

export default function Footer() {
  return (
    <div className="bg-gradient-to-tr from-primary to-purple-700 py-10">
      <div className="w-11/12 mx-auto lg:w-10/12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="">
            <div className="text-white text-xl">{SiteName}</div>
            <div className="flex flex-row items-center gap-8 text-2xl text-white mt-8">
              {SocialMediaLinks.map((item, index) => (
                <div
                  className="cursor-pointer hover:text-orange-300 hover:scale-110 transition-all"
                  key={index}
                >
                  <item.Icon />
                </div>
              ))}
            </div>
            <div className="text-white mt-8 border-t pt-5 flex flex-col gap-3">
            <div className="flex items-center gap-2"> <SlClock /> Working hours: 24/7</div>
            <div className="flex items-center gap-2"> <SlEnvolope /> {SiteEmail}</div>
            <div className="flex items-center gap-2"> <SlEarphonesAlt /> {SiteContact}</div>
            </div>
          </div>
          <div className="">
            <div className="text-3xl font-bold mb-5 text-white border-b pb-5">
              Quick Links
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              {QuickLinks.map((item, index) => (
                <Link
                  className="text-white hover:text-orange-300 capitalize "
                  to={`${item.url}`}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              {QuickLinks2.map((item, index) => (
                <Link
                  className="text-white hover:text-orange-300 capitalize "
                  to={`${item.url}`}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            </div>
          </div>
          <div className="">
            <div className="font-bold text-2xl text-white mb-5 pb-7 border-b">
              Subscribe to our NewsLetters
            </div>
            <div className="text-white my-5">
              Be among the first to get latest financial and economical updates
              directly to your mailbox
            </div>
            <div className="bg-black/20 rounded-lg p-3 flex flex-col gap-5">
                <input
                  className="w-full px-5 py-3 rounded-lg text-white bg-gray-200 focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="w-full px-5 py-3 rounded-lg text-white bg-red-600">
                  Subscribe
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
