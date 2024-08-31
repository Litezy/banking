import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ActiveComponent from 'utils/ActiveComponent'
import ButtonComponent from 'utils/ButtonComponent'
import ClosedComponent from 'utils/ClosedComponent'
import FormComponent from 'utils/FormComponent'
import { errorMessage, successMessage } from 'utils/functions'
import { MdDelete } from "react-icons/md";
import { Apis, GetApi, PostApi } from 'services/Api'
import Loader from 'utils/Loader'

const TicketsStatus = () => {
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status')
    const [pendings, setPendings] = useState([])
    const [loading, setLoading] = useState(false)
    const [actives, setActives] = useState([])
    const navigate = useNavigate()
    const [closed, setClosed] = useState([])
    const [screen, setScreen] = useState(null)
    const [fileName, setFileName] = useState('');
    useEffect(() => {
        if (status === 'create') return setScreen(1)
        if (status === 'active') return setScreen(2)
        if (status === 'closed') return setScreen(3)
    }, [status])

    const [forms, setForms] = useState({
        subject: '',
        message: ''
    })
    const [ticketimg, setTicketimg] = useState({
        img: '',
        image: ''
    })

    const imageRef = useRef(null)
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file.size >= 1000000) {
            imageRef.current.value = null
            return errorMessage('file too large')
        }
        if (!file.type.startsWith(`image/`)) {
            imageRef.current.value = null
            return errorMessage('Invalid file format detected, try with a different photo')
        }
        setFileName(file.name);
        setTicketimg({
            img: URL.createObjectURL(file),
            image: file
        })

    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }


    const deleteImage = () => {
        if (imageRef.current) {
            imageRef.current.value = '';  // Clear the file input value
        }
        setFileName('');  // Clear the file name display
        setTicketimg({
            img: '',
            image: ''
        });
    }

    const uploadImg = (e) => {
        e.preventDefault()
        imageRef.current.click()
    }
 
    const fetchActiveTickets = useCallback(async () => {
        try {
            const res = await GetApi(Apis.auth.active_tickets)
            if (res.status !== 200) return errorMessage(res.msg)
            setActives(res.data)
        } catch (error) {
            errorMessage(`something went wrong in fetching active tickets data`, error.message)
        }
    }, [])
    const fetchClosedTickets = useCallback(async () => {
        try {
            const res = await GetApi(Apis.auth.closed_tickets)
            if (res.status !== 200) return errorMessage(res.msg)
            setClosed(res.data)
        } catch (error) {
            errorMessage(`something went wrong in fetching closed tickets data`, error.message)
        }
    }, [])

    useEffect(()=>{
        if(status === 'active'){
            fetchActiveTickets()
        }
        if(status === 'closed'){
            fetchClosedTickets()
        }
    },[])

    const submitTicket = async (e) => {
        e.preventDefault()
        if (!forms.subject) return errorMessage(`subject is required`)
        if (!forms.message) return errorMessage(`message is required`)
        const formdata = new FormData()
        formdata.append('subject', forms.subject)
        formdata.append('message', forms.message)
        if (fileName) {
            formdata.append('image', ticketimg.image)
        }
        setLoading(false)
        try {
            const res = await PostApi(Apis.auth.create_ticket, formdata)
            if (res.status !== 200) return errorMessage(res.msg)
            successMessage(res.msg)
            navigate(`/user/tickets?status=pending`)
        } catch (error) {
            errorMessage(`something went wrong in submitting ticket`, error.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='w-full mt-5'>
            {screen === 1 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>
                <div className="md:w-[80%] mx-auto  bg-white h-fit py-5 rounded-md shadow-md ">

                        {loading && 
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
                            <Loader/>
                        </div>
                        }

                    <div className="p-5 text-xl font-bold">Create New Ticket</div>
                    <hr className='my-2' />
                    <form onSubmit={submitTicket} className="w-full p-5 flex items-start flex-col gap-4">
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">subject <span className='text-red-400'>*</span></div>
                            <FormComponent name={`subject`} value={forms.subject} onchange={handleChange} />
                        </div>
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">message <span className='text-red-400'>*</span></div>
                            <textarea placeholder='message'
                                className='w-full max-h-72 h-52 resize-none border hover:border-black rounded-md p-2'
                                name='message'
                                value={forms.message}
                                onChange={handleChange}
                            >

                            </textarea>
                        </div>
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">attachment (optional) <span className='text-red-400'>*</span></div>
                            <div className="border-zinc-300 pr-2 rounded-md flex items-center justify-between gap-3 w-full hover:border-zinc-600 border  h-12 ">
                                <input ref={imageRef}
                                    type="file"
                                    className={`w-fit hidden`}
                                    placeholder='choose file'
                                    onChange={handleImage}
                                />
                                <span className="px-2 text-sm text-gray-600 truncate">{fileName || 'No file chosen'}</span>
                                {fileName && <span className=''><MdDelete onClick={deleteImage} className='text-red-600 cursor-pointer font-bold text-2xl ' /></span>}
                                <button onClick={uploadImg} className='bg-gradient-to-tr from-primary to bg-purple-700 w-fit px-4 py-2 rounded-md text-white '>browse</button>
                            </div>
                        </div>
                        <ButtonComponent disabled={loading ? true : false}
                            title={loading ? '... Submitting' : 'Submit ticket'}
                            bg={`bg-gradient-to-tr mt-5 from-primary to-purple-700 text-white h-12`} />
                    </form>
                </div>
            </div>}






            {screen === 2 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>

                <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                    <div className=" text-xl font-bold">Active Tickets</div>
                    <hr className='my-2' />
                    <div className="my-5">You have {actives && actives.length > 0 ? `${actives.length} active ticket(s), see them below.`:'0 active tickets.'}</div>
                    <ActiveComponent actives={actives} />
                </div>
            </div>}



            {screen === 3 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>

                <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                    <div className=" text-xl font-bold">Closed Tickets</div>
                    <hr className='my-2' />
                    <div className="my-5">You have {closed && closed.length > 0 ? `${closed.length} active ticket(s), see them below.`:'0 active tickets.'}</div>
                    <ClosedComponent closed={closed} />
                </div>
            </div>}


        </div>
    )
}

export default TicketsStatus





// for (let [key, value] of formdata.entries()) {
//     if (value instanceof File) {
//         console.log(`${key}: ${value.name}`); // Logs the file name
//     } else {
//         console.log(`${key}: ${value}`); // Logs other form data
//     }
// }