import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FaMoneyBillTransfer} from 'react-icons/fa6'
import {IoHomeOutline} from'react-icons/io5'
import {GrCreditCard, GrHistory} from'react-icons/gr'
import {BsGearWideConnected} from'react-icons/bs'


const Lists = [
    {icon: GrHistory, url: '/user/transactions', tag: 'transactions'},
    {icon: GrCreditCard, url: '/user/cards', tag: 'cards'},
    {icon: IoHomeOutline, url: '/user', tag: 'user'},
    {icon: FaMoneyBillTransfer, url: '/user/transfer', tag: 'transfer'},
    {icon: BsGearWideConnected, url: '/user/settings', tag: 'settings'},
]

export default function Userfooter() {
    const pathname = useLocation().pathname
    
  return (
    <div className='fixed bottom-6 left-0 lg:hidden rounded-lg border right-0 bg-gradient-to-tr from-primary to-purple-700 h-12 w-11/12 mx-auto'>
        <div className="flex items-center justify-evenly -mt-4">
            {Lists.map((item, index) => ( 
                <Link to={`${item.url}`} key={index} className={
                    ` transition-all hover:text-orange-400
                    ${pathname.endsWith(item.tag) ? 'text-3xl rounded-full border-4 border-white shadow-xl p-4 bg-slate-200 text-primary' : ' text-2xl text-white'}`
                }>
                    <item.icon />
                </Link>
            ))}
        </div>
    </div>
  )
}
