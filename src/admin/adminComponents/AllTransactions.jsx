import React, { useCallback, useEffect, useState } from 'react'
import Summary from './Summary'
import { errorMessage, successMessage } from 'utils/functions'
import { Apis, GetApi, PostApi } from 'services/Api'
import moment from 'moment'
import ModalLayout from 'utils/ModalLayout'
import ButtonComponent from 'utils/ButtonComponent'
import Loader from 'utils/Loader'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import TablePagination from './TablePagination'

const AllTransactions = () => {

  const [transhistory, setTransHistory] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [dates, setDates] = useState(false)
  const [page, setPage] = useState(1)
  const [forms, setForms] = useState({
    date: ''
  })
  const [message, setMessage] = useState('')

  const getAllTrans = useCallback(async () => {
    try {
      const res = await GetApi(`${Apis.admin.all_trans}?page=${page}`)
      if (res.status === 200) {
        setTransHistory(res)
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }, [page])

  useEffect(() => {
    getAllTrans()
  }, [getAllTrans])

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setForms({ ...forms, date: formattedDate });
    setSelectedDate(date);
  };
  
  const selectOne = (item) => {
    setSelectedItem(item)
    setMessage(item.message)
  }


  const Changedate = async (e) => {
    e.preventDefault()
    const formdata = {
      id: selectedItem.id,
      date: forms.date,
      message: message
    }
    setLoading(true)
    // console.log(formdata)
    try {
      const res = await PostApi(Apis.admin.trans_date, formdata)
      if (res.status === 200) {
        successMessage(res.msg)
        getAllTrans()
        setForms({ ...forms, date: "" })
        setModal(false)
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error.mesage)
    } finally {
      setLoading(false)
    }
  }
  const maxDate = moment('31-12-2024', 'DD-MM-YYYY').toDate();
  return (
    <div className='w-11/12 mx-auto'>
      <div className="lg:w-2/4 w-3/4 mx-auto">
        <Summary color='bg-primary text-white' title={'Total Transactions'} data={`Showing ${transhistory.data?.length} out of ${transhistory.total}`} />
      </div>

      {modal &&
        <ModalLayout setModal={setModal} clas={`w-11/12 mx-auto w-11/12 max-w-xl`}>
          <form onSubmit={Changedate} className={`w-full p-5 bg-white relative ${dates ? "h-[73dvh]" : 'h-fit'} rounded-md`}>
            {loading &&
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
                <Loader />
              </div>
            }

            <div className="text-center text-base md:text-xl font-semibold">Alter Transaction Date</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="">New Date:</div>
              <div className="w-3/4 ml-auto">
                <DatePicker
                  selected={selectedDate}
                  onCalendarOpen={() => setDates(true)}
                  onCalendarClose={() => setDates(false)}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="bg-white mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date"
                  popperClassName="shadow-lg rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  calendarClassName="!w-full !p-2"
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={5}
                  maxDate={maxDate}
                  scrollableYearDropdown 
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="">Transfer message</div>
                <textarea
                  value={message}
                  className='w-full  max-h-20 resize-none p-2 rounded-md border hover:border-black'
                  onChange={e => setMessage(e.target.value)}
                  placeholder='Transfer message'
                >
                </textarea>
            </div>
            <div className="mt-5 w-full mx-auto">
              <ButtonComponent title={`Change transaction`} bg={`h-10 text-white bg-primary`} />
            </div>
          </form>
        </ModalLayout>
      }

      <div className="relative overflow-x-auto rounded-md mt-10">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className=" bg-gradient-to-tr from-primary to-purple-700 lg:text-xl text-base text-white">
            <tr>
              <th scope="col" className="px-3 py-3">
                ID
              </th>
              <th scope="col" className="px-3 py-3">
                User
              </th>
              <th scope="col" className="px-3 py-3">
                Email
              </th>
              <th scope="col" className="px-3 py-3">
                Amount
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
              <th scope="col" className="px-3 py-3">
                Type
              </th>
              <th scope="col" className="px-3 py-3">
                Date
              </th>
              <th scope="col" className="px-3 py-3">
                Alter
              </th>
            </tr>
          </thead>
          <tbody>
            {transhistory.total > 0 ? transhistory.data?.map((item, i) => (
              <tr className="bg-white border-b " key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.id}
                </th>
                <td className="px-3 py-3 capitalize">
                  {item.usertransactions?.firstname}
                </td>
                <td className="px-3 py-3">
                  {item.usertransactions?.email}
                </td>
                <td className="px-3 py-3">
                {item.usertransactions?.currency}{item.amount}
                </td>
                <td className="px-3 py-3">
                  {item.status}
                </td>
                <td className="px-3 py-3 truncate">
                  {item.type}
                </td>
                <td className="px-3 truncate py-3">
                  {item.date}
                </td>
                <td className="px-3 py-3">
                  <button onClick={() => setModal(true)} onMouseOver={() => selectOne(item)} className="bg-green-500 text-white px-5 rounded-lg py-2">alter</button>
                </td>
              </tr>
            )) :
              <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                <td>No transactions found</td>
              </tr>
            }

          </tbody>
        </table>

        <TablePagination
              onChange={num => setPage(num)}
              page={page}
              perPage={transhistory.page_size}
              total={transhistory.total}
            />

      </div>
    </div>
  )
}

export default AllTransactions