import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa6'
import { IoIosMailUnread } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Apis, GetApi } from 'services/Api'
import { errorMessage, successMessage } from 'utils/functions'
import { FaCopy } from "react-icons/fa";

const Transactions = () => {

  const [transdata, setTransData] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const fetchTransHistory = useCallback(async () => {
    try {
      const response = await GetApi(Apis.auth.trans_history)
      if (response.status === 200) {
        setTransData(response.data)
      } else {
        console.log(response.msg)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }, [])

  const currency = useSelector((state) => state.profile.currency)
  useEffect(() => {
    fetchTransHistory()
  }, [])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = transdata.slice(firstIndex, lastIndex)
  const npage = Math.ceil(transdata.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);


  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const deposit = 'Deposit'
  const withdraw = 'Withdraw'
  const changeCurrentPage = (id, e) => {
    e.preventDefault();
    setCurrentPage(id);
  }


  const selectOne = (item) => {
    setSelectedItem(item)
  }

  const copyToClip = async () => {
    try {
      await navigator.clipboard.writeText(selectedItem.transaction_id);
      successMessage('transaction ID copied!');
    } catch (err) {
      errorMessage('Failed to copy!');
    }
  };

  return (
    <div className='w-full'>
      <div className="w-11/12 mx-auto mt-10">
        <div className="text-2xl font-semibold">Transaction History</div>

        <div className="mt-5 w-full">
          {records.map((item, index) => (
            <div className="rounded-xl mb-5 bg-white shadow-md border" key={index}>
              <div className="p-3"> {item.title}</div>
              <div className="flex flex-col">
                <div className="p-3 border-b last:border-none cursor-pointer">
                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-1 bg-blue-300 text-blue-50">
                        <div className="bg-blue-400 rounded-full p-1">
                          <IoIosMailUnread className='text-xl' />
                        </div>
                      </div>
                      <div className="text-sm font-bold">{item.type}</div>
                      <FaMinus className='text-slate-500' />
                      <div className={`text-xs font-semibold ${item.status === 'success' ? 'text-green-600' : item.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`}>{item.status}</div>
                    </div>
                    <div className="">
                      <div className={`text-base font-bold text-right 
                        ${item.type === deposit && item.status === 'pending' ? 'text-yellow-500' : item.type === deposit && item.status === 'success' ? 'text-green-600' : "text-red-600"}`}>
                        {item.type === deposit && item.status === 'success' ? '+' : item.type === deposit && item.status === 'pending' ? '' : '-'}{currency}{parseInt(item.amount).toLocaleString()}</div>
                      <div className="text-xs text-right">{item.date}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{item.message}</div>
                  <div className="flex items-center gap-3 text-sm mt-2 text-slate-500">
                    <div className="">Transaction ID:</div>
                    <div className="">{item.transaction_id}</div>
                    <div onClick={copyToClip} onMouseOver={() => selectOne(item)} className="">
                      <FaCopy className='text-blue-400 text-lg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-fit ml-auto mr-5 mt-5">
          <div className="w-full flex flex-col items-center ">
            <span className="text-sm text-gray-700 ">
              Showing <span className="font-semibold text-black">{firstIndex}</span> to
              <span className="font-semibold text-black"> {lastIndex > transdata.length ? transdata.length : lastIndex}</span> of
              <span className="font-semibold text-black"> {transdata.length} </span>
              Transactions
            </span>

            <div className=" flex items-center gap-4 mt-2 xs:mt-0">
              <button onClick={prevPage} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#60a5fa] rounded-s hover:bg-[#4789da]
                      ">
                Prev
              </button>

              {numbers.map((n, i) => (
                <div className={``} key={i}>
                  <a onClick={(e) => changeCurrentPage(n, e)} href="#" className={`flex items-center justify-center
                    px-3 h-8 leading-tight   border border-gray-300 rounded-md
                      ${currentPage === n ? 'bg-[#60a5fa] text-white' : 'bg-white hover:bg-gray-100'}`}>{n}</a>
                </div>
              ))}
              <button onClick={nextPage} className="flex items-center justify-center px-4 h-10 text-base font-medium
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

export default Transactions