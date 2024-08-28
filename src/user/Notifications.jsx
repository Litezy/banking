import React, { useCallback, useEffect, useState } from 'react'
import { BsBell } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa6';
import { IoIosMailUnread } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { dispatchNotifications } from 'app/reducer';
import { errorMessage, successMessage } from 'utils/functions';
import { Apis, GetApi, PostApi } from 'services/Api';
import Loader from 'utils/Loader';

const Notifications = () => {

  const [notifications,setNotifications]= useState([]) 
  const dispatch = useDispatch()
  const [selectedItem,setSelectedItem]= useState({})
  const [loading,setLoading] = useState(false)
  const profile = useSelector((state)=> state.profile.profile)
  const fetchUserNotifications = useCallback(async()=>{
    try {
        const response = await GetApi(Apis.auth.user_notifications)
        if(response.status === 200){
            setNotifications(response.data)
            dispatch(dispatchNotifications(response.data))
        }else{
            console.log(response)
        }
    } catch (error) {
        console.error('Error fetching currency:', error);
    }
},[])

useEffect(()=>{
    fetchUserNotifications()
},[profile,dispatch])

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = notifications.slice(firstIndex, lastIndex)
  const npage = Math.ceil(notifications / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1);
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

  const selectOne =(item)=>{
    setSelectedItem(item)
  }

  const markAsRead = async ()=>{
    const formdata = {
      id: selectedItem.id,
    }
    try {
      const response = await PostApi(Apis.auth.markas_read,formdata)
      if(response.status === 200){
        // successMessage(response.msg)
        fetchUserNotifications()
      }else{
        console.log(response)
      }
    } catch (error) {
      errorMessage(error.message)
    }
  }
 const MarkAll = async ()=>{
  setLoading(true)
  try {
    const res = await PostApi(Apis.auth.mark_all)
    if(res.status !== 200) return errorMessage(res.msg)
      successMessage(res.msg)
    fetchUserNotifications()
  } catch (error) {
    errorMessage(error.message)
  }finally{
    setLoading(false)
  }
 }
  return (
    <div className='w-full mt-5 lg:mt-10'>
      <div className="w-11/12 mx-auto lg:px-5 py-5 ">
        <div className="flex w-full items-center justify-between">
          <div className="text-2xl font-bold">Latest Notifications</div>
          <button onClick={MarkAll} className='w-fit px-5 py-2 rounded-md bg-gradient-to-tr from-primary to-purple-700  text-sm md:text-base text-white'>Mark all as read</button>
        </div>
        <div className="mt-5 w-full relative">

          {loading &&
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
            <Loader/>
          </div>
          }
          {records.map((item, index) => (
            <div onClick={markAsRead} onMouseOver={()=> selectOne(item)} className="rounded-md mb-3 bg-white border shadow-md" key={index}>
              <div className="flex flex-col ">
                <div className={`${item.status === 'unread' ? 'bg-zinc-200 rounded-t-sm hover:bg-zinc-200' : ''} p-3 flex items-start md:items-center flex-col md:flex-row gap-3 md:gap-0   justify-between border-b last:border-none cursor-pointer`}>
                  <div className="flex items-start md:items-center gap-3 lg:w-[75%] ">
                    <div className="w-fit px-3 relative py-3 rounded-full font-semibold bg-[#f1f5f9]">
                      <BsBell />
                      {item.status === 'unread' && <div className="w-2 h-2 rounded-full bg-red-600 absolute right-2 top-2"></div>}
                    </div>
                    <div className="flex items-start gap-2 flex-col">
                      <div className="w-fit px-2 py-1 rounded-md bg-[#f1f5f9]">{item.type}</div>
                      <div className="text-sm">{item.message}</div>
                    </div>
                  </div>                 
                    <div className="text-sm">{moment(item.createdAt).format(`DD-MM-YYYY hh:mmA`)}</div>
                </div>

              </div>
            </div>
          ))}
        </div>


        <div className="w-fit ml-auto mr-5 mt-5">
          <div className="w-full flex flex-col items-center ">
            <span className="text-sm text-gray-700 ">
              Showing <span className="font-semibold text-black">{records?.length === 0 ? '0' : firstIndex}</span> to
              <span className="font-semibold text-black"> {lastIndex > notifications?.length ? notifications?.length : lastIndex }</span> of
              <span className="font-semibold text-black"> {notifications?.length} </span>
              Transactions
            </span>

            <div className=" flex items-center gap-4 mt-2 xs:mt-0">
              <button onClick={prevPage} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gradient-to-tr from-primary to-purple-700 rounded-md
                      ">
                Prev
              </button>

              {/* {numbers.map((n, i) => (
                <div className={``} key={i}>
                  <a onClick={(e) => changeCurrentPage(n, e)} href="#" className={`flex items-center justify-center
                    px-3 h-8 leading-tight   border border-gray-300 rounded-md
                      ${currentPage === n ? 'bg-[#60a5fa] text-white' : 'bg-white hover:bg-gray-100'}`}>{n}</a>
                </div>
              ))} */}
              <button onClick={nextPage} className="flex items-center justify-center px-4 h-10 text-base font-medium
                     text-white bg-gradient-to-tr from-primary to-purple-700  rounded-md  rounded-e   ">
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