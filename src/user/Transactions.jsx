import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa6'
import { IoIosMailUnread } from 'react-icons/io'
import { Currency } from 'utils/functions'

const Transactions = () => {
  const TransData = [
    {
      title: 'Today',
      data: [
        {
          title: 'Withdrawal',
          amount: '1200',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '12:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Withdrawal',
          amount: '1200',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '12:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Withdrawal',
          amount: '1200',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '12:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Deposit',
          amount: '1,000',
          status: 'Failed',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          date: '11:00 PM'
        },
        {
          title: 'Transfer',
          amount: '500',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Success',
          date: '10:00 PM'
        },
        {
          title: 'Transfer',
          amount: '700',
          content: `you have successfully transferred ${Currency}1,000 to keneth williams`,
          status: 'Failed',
          date: '9:00 PM'
        }
      ]
    },
  ]


  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = TransData
  const npage = Math.ceil(TransData[0].data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);

    if(records[0].data.length === 0){
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

  // console.log(records)
  const [user,setUser] = useState({
    country:'China'
  })
  const [data,setData] = useState('')
  const [currency,setCurrency] = useState()
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${user.country}`);
        if (response.data && response.data.length > 0) {
          const countryData = response.data[0]; 
          const currencySymbol = Object.values(countryData.currencies)[0].symbol;
          setCurrency(currencySymbol);
          // console.log(`Country: ${user.country}, Currency: ${currencySymbol}`)
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching currency:', error);
      }
    };

    fetchCurrency();
  }, [user.country]);
  return (
    <div className='w-full'>
      <div className="w-11/12 mx-auto mt-10">
        <div className="text-2xl font-semibold">Transaction History</div>

        <div className="mt-5 w-full">
          {records.map((item, index) => (
            <div className="rounded-xl mb-5 bg-white shadow-md border" key={index}>
              <div className="p-3"> {item.title}</div>
              <div className="flex flex-col">
                {item.data.slice(firstIndex,lastIndex).map((ele, i) => (
                  <div
                    // onClick={() => setViews({status: true, data: ele})}
                    key={i} className="p-3 border-b last:border-none cursor-pointer">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-1 bg-blue-300 text-blue-50">
                          <div className="bg-blue-400 rounded-full p-1">
                            <IoIosMailUnread className='text-xl' />
                          </div>
                        </div>
                        <div className="text-sm font-bold">{ele.title}</div>
                        <FaMinus className='text-slate-500' />
                        <div className={`text-xs font-semibold ${ele.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{ele.status}</div>
                      </div>
                      <div className="">
                        <div className={`text-base font-bold text-right ${ele.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{ele.status === "Success" ? '+' : '-'}{Currency}{parseInt(ele.amount).toLocaleString()}</div>
                        <div className="text-xs text-right">{ele.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">{ele.content}</div>
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
              <span class="font-semibold text-black"> {lastIndex > TransData[0].data.length ? TransData[0].data.length : lastIndex}</span> of
              <span class="font-semibold text-black"> {TransData[0].data.length} </span>
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

export default Transactions