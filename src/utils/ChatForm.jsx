import React, { useEffect, useRef, useState } from 'react'
import { FaPlus, FaRegPaperPlane, FaRegSmile } from 'react-icons/fa'
import { MdOutlineAttachment } from "react-icons/md";
import { errorMessage, MoveToBottom } from './functions';
import { Apis, PostApi } from 'services/Api';


const ChatForm = ({ roomid, sendmessage }) => {

    const textRef = useRef(null)
    const refDiv = useRef(null)
    const [text, setText] = useState('')
    const [icon, setIcon] = useState(false)



    useEffect(() => {
        if (refDiv) {
            window.addEventListener('click', (e) => {
                if (refDiv.current !== null) {
                    if (refDiv.current.contains(e.target)) {
                    } else {
                        setIcon(false)
                    }
                }
            }, true)
        }
    }, [])

    // const roomid = useSelector((state) => state.data.roomid)
    const SubmitContent = async () => {
        const formdata = {
            roomid: roomid,
            content: text
        }
        try {
            const response = await PostApi(Apis)
            if (response.status === 200) {
                sendmessage()
                setText('')
                MoveToBottom()
            }
        } catch (error) {
            errorMessage(error.message)
        }

    }
    return (
        <div className='text-black relative flex h-[13dvh] '>
            <div className="flex items-center w-11/12 gap- pt-1 mx-auto">
                <button>
                    <label>
                        <MdOutlineAttachment className="md:text-2xl text-xl text-blue-400" />
                        <input type="file" hidden />
                    </label>
                </button>
                <textarea
                    ref={textRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='scroll md:h-16 min-h-[15px] h-14 mx-auto pt-3 md:pt-5 border-2 rounded-md w-11/12 outline-none pl-2  resize-none' placeholder='Message'>

                </textarea>
                {text.length > 0 && <button
                    onClick={SubmitContent}
                    className="text-2xl">
                    <FaRegPaperPlane className='text-primary' />
                </button>}
            </div>

        </div>
    )
}


export default ChatForm