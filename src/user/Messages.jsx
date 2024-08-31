import { dispatchMessages } from 'app/reducer'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Apis, GetApi } from 'services/Api'
import ChatForm from 'utils/ChatForm'
import ChatMessages from 'utils/ChatMessages'
import { errorMessage } from 'utils/functions'
import Loader from 'utils/Loader'

const Messages = () => {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()

  const fecthticketMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await GetApi(`${Apis.auth.one_ticket_msgs}/${id}`)
      if (res.status !== 200) errorMessage(res.msg)
      setMessages(res.data?.ticketmessages)
    console.log(res.data)
     dispatch(dispatchMessages(res.data?.ticketmessages))
    } catch (error) {
      errorMessage(`something went wrong in fetching messages.`, error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fecthticketMessages()
  }, [])

  return (
    <div className=' w-11/12 mx-auto'>
      <div className="mb-5 w-full mx-auto md:w-11/12 bg-white h-[90dvh] relative flex-col rounded-lg flex items-start justify-between">

        {loading &&
          <div className="absolute top-0 bg-black/60 backdrop-blur-sm w-full h-[90dvh] rounded-md left-1/2 -translate-x-1/2">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md bg-white"><Loader/></div>
          </div>
        }

        <div className="h-[10dvh] w-full border-b flex items-center px-5 justify-between">
          <Link
            className='w-fit px-4 py-1 rounded-md bg-gradient-to-tr from-primary to bg-purple-700 text-white'
            to={`/user/tickets?status=active`}
          >back</Link>
          <div className="">Admin</div>
          <div className="">Status: <span className='text-green-500'>online</span></div>
        </div>
        <div className="h-[70dvh] overflow-y-auto w-full py-1  downdiv border-b">
          <ChatMessages/>
        </div>
        <div className="h-[13dvh] w-full ">
          <ChatForm />
        </div>
      </div>
    </div>
  )
}

export default Messages