import { dispatchMessages } from 'app/reducer'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Apis, GetApi, profileImg } from 'services/Api'
import ChatForm from 'utils/ChatForm'
import ChatMessages from 'utils/ChatMessages'
import { errorMessage, MoveToBottom } from 'utils/functions'
import { MdSupportAgent } from "react-icons/md";
import Loader from 'utils/Loader'

const Messages = () => {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState({})
  const [admin, setAdmin] = useState({})
  const { id } = useParams()
  const dispatch = useDispatch()

  const fecthticketMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await GetApi(`${Apis.auth.one_ticket_msgs}/${id}`)
      if (res.status !== 200) errorMessage(res.msg)
      setMessages(res.data?.ticketmessages)
      setTickets(res.data)
      dispatch(dispatchMessages(res.data?.ticketmessages))
      if (res.data?.adminid !== null) {
        const id = res.data?.adminid
        try {
          const res = await GetApi(`${Apis.auth.find_admin}/${id}`)
          if (res.status !== 200) return errorMessage(res.msg)
          setAdmin(res.data)
        console.log(res.data)
          MoveToBottom()
        } catch (error) {
          errorMessage(`error in fetch support admin`, error.message)
        }
      }
      MoveToBottom()
    } catch (error) {
      errorMessage(`something went wrong in fetching messages.`, error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fecthticketMessages()
    MoveToBottom()
    // console.log(admin)
  }, [])


  return (
    <div className=' w-11/12 mx-auto'>
      <div className="mb-5 w-full mx-auto md:w-11/12 bg-white h-[90dvh] relative flex-col rounded-lg flex items-start justify-between">

        {loading &&
          <div className="absolute top-0  backdrop-blur-sm w-full h-full rounded-md left-1/2 -translate-x-1/2">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md bg-white"><Loader /></div>
          </div>
        }

        <div className="h-[10dvh] w-full border-b flex items-center px-5 justify-between">
          <Link
            className='w-fit px-4 py-1 rounded-md bg-gradient-to-tr from-primary to bg-purple-700 text-white'
            to={`/user/tickets?status=active`}
          >back</Link>

          <div className="flex items-center gap-3">
            <MdSupportAgent className='text-2xl' />
            <div className="capitalize">{admin?.firstname ? `admin ${admin?.firstname} ${admin?.lastname}` : 'No support staff joined'}</div>

          </div>

           <div className="text-sm">status: <span 
           className={`${admin?.status === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
            {admin?.status === 'online' ? 'online' : admin?.status ==='offline' ? 'offline':'not joined' }</span></div>
        </div>
        <div className="h-[70dvh] overflow-y-auto w-full py-1 scroll  downdiv ">
          <div className="text-sm text-primary font-semibold text-right mr-3">Ticket Details</div>
          <div
            className={`${tickets?.message?.length || tickets?.subject?.length <= 90 ? 'w-fit' : 'w-[55%]'} relative text-sm  border px-4 mt-1  ml-auto bg-gradient-to-tr from-primary to-purple-700 text-white  py-2 flex items-start flex-col gap-2  rounded-md mr-2`}>
            <div className="flex items-start gap-1">
              <div className="">Subject:</div>
              <div className="">{tickets.subject}</div>
            </div>
            <div className="flex items-start gap-1">
              <div className="">Message:</div>
              <div className="">{tickets.message}</div>
            </div>
          </div>
          <div className="text-sm text-primary font-semibold text-right mr-3 mt-3">Image</div>
          <div className="text-right mr-3 w-10/12 mb-3 ml-auto">
            {tickets?.image ?
              <img
                src={`${profileImg}/tickets/${tickets?.image}`}
                className='w-fit object-fill'
                alt="ticketimg" /> :
              <div className="text-sm">No image attached</div>
            }
          </div>
          {tickets?.adminid && <div className="my-2 w-fit px-5 py-2 border-slate-300 border mx-auto  rounded-lg ">an admin has joined the chats</div>}
          <ChatMessages />
        </div>
        <div className="h-fit border-t py-2 w-full ">
          <ChatForm ticketid={tickets?.id} fetchMsgs={() => fecthticketMessages()} />
        </div>
      </div>
    </div>
  )
}

export default Messages