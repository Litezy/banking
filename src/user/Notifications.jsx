import React, { useState } from 'react'
import { BsBell } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa6';
import { IoIosMailUnread } from 'react-icons/io';

const Notifications = () => {

  const notifications = [
    {
      day: 'Today',
      details: [
        {
          title: 'Deposit',
          desc: 'You just received a deposit of $45 from mike wallace',
          date: '28 July 2024',
          read:false
        },
        {
          title: 'Bank Withdrawal',
          desc: 'You have made a withdrawal of $20 from your account',
          date: '28 July 2024',
          read:true
        },
        {
          title: 'Notice for verification',
          desc: 'Dear User, kindly verify your email',
          date: '28 July 2024',
          read:false
        },
      ]
    }
  ]


  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = notifications
  const npage = Math.ceil(notifications[0].details.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);

    if(records[0].details.length === 0){
      firstIndex = 0
    }
     if(firstIndex === 0){
      firstIndex = 1
    }
  
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeCurrentPage = (id, e) => {
    e.preventDefault()
    setCurrentPage(id)
  }



  return (
    <div className='w-full mt-5 lg:mt-10'>
      <div className="w-11/12 mx-auto px-5 py-5 ">
        <div className="text-2xl font-bold">Latest Notifications</div>

        <div className="mt-5 w-full">
          {records.map((item, index) => (
            <div className="rounded-xl mb-5 bg-white shadow-md border" key={index}>
              <div className="p-3"> {item.day}</div>
              <div className="flex flex-col">
                {item.details.map((ele, i) => (
                  <div key={i} className={`${ele.read === false ? 'bg-zinc-300 rounded-t-sm hover:bg-zinc-200':''} p-4 flex items-center  justify-between border-b last:border-none cursor-pointer`}>
                    <div className="flex items-center gap-3">
                    <div className="w-fit px-3 relative py-3 rounded-full bg-[#f1f5f9]">
                    <BsBell />
                    {ele.read === false && <div className="w-2 h-2 rounded-full bg-red-600 absolute right-2 top-2"></div>}
                    </div>
                    <div className="flex items-start gap-2 flex-col">
                      <div className="w-fit px-2 py-1 rounded-md bg-[#f1f5f9]">{ele.title}</div>
                      <div className="">{ele.desc}</div>
                    </div>
                    </div>
                    <div className="text-sm">{ele.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


        <div className="w-fit ml-auto mr-5 mt-5">
          <div class="w-full flex flex-col items-center ">
            <span class="text-sm text-gray-700 ">
              Showing <span class="font-semibold text-black">{firstIndex}</span> to
              <span class="font-semibold text-black"> {lastIndex > notifications[0].details.length ? notifications[0].details.length : lastIndex}</span> of
              <span class="font-semibold text-black"> {notifications[0].details.length} </span>
              Transactions
            </span>

            <div class=" flex items-center gap-4 mt-2 xs:mt-0">
              <button onClick={prevPage} class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#60a5fa] rounded-s hover:bg-[#4789da]
                      ">
                Prev
              </button>

              {numbers.map((n, i) => (
                <div className={``} key={i}>
                   <a onClick={(e) => changeCurrentPage(n, e)} href="#" className={`flex items-center justify-center
                    px-3 h-8 leading-tight   border border-gray-300 rounded-md
                      ${currentPage === n ? 'bg-[#60a5fa] text-white':'bg-white hover:bg-gray-100'}`}>{n}</a>
                </div>
              ))}
              <button onClick={nextPage} class="flex items-center justify-center px-4 h-10 text-base font-medium
                     text-white bg-[#60a5fa] rounded-s hover:bg-[#4789da] rounded-e   ">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications