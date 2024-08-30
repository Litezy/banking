import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ActiveComponent from 'utils/ActiveComponent'
import ButtonComponent from 'utils/ButtonComponent'
import ClosedComponent from 'utils/ClosedComponent'
import FormComponent from 'utils/FormComponent'
import { errorMessage } from 'utils/functions'
import PendingComponent from 'utils/PendingComponent'

const TicketsStatus = () => {
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status')
    const [pendings,setPendings] = useState([])
    const [actives,setActives] = useState([])
    const [closed,setClosed] = useState([])
    const [screen, setScreen] = useState(null)
    useEffect(() => {
        if (status === 'create') return setScreen(1)
        if (status === 'pending') return setScreen(2)
        if (status === 'active') return setScreen(3)
        if (status === 'closed') return setScreen(4)
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
        setTicketimg({
            img: URL.createObjectURL(file),
            image: file
        })

    }

    const changeImage = () => {
        if (imageRef.current) {
            imageRef.current.value = ''
        }
        setTicketimg({
            img: '',
            image: ''
        })
    }

    return (
        <div className='w-full mt-5'>
            {screen === 1 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>
                <div className="lg:w-[80%] mx-auto  bg-white h-fit py-5 rounded-md shadow-md ">
                    <div className="p-5 text-xl font-bold">Create New Ticket</div>
                    <hr className='my-2' />
                    <form className="w-full p-5 flex items-start flex-col gap-4">
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">subject <span className='text-red-400'>*</span></div>
                            <FormComponent />
                        </div>
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">message <span className='text-red-400'>*</span></div>
                            <textarea placeholder='message'
                                className='w-full max-h-72 h-52 resize-none border hover:border-black rounded-md p-2'
                            >

                            </textarea>
                        </div>
                        <div className="flex items-start flex-col gap-1 w-full">
                            <div className="">attachment <span className='text-red-400'>*</span></div>
                            <label className="border-zinc-300 pr-2 rounded-md flex items-center justify-between gap-3 w-full hover:border-zinc-600  h-12 border">
                                <input ref={imageRef}
                                    // value={value}
                                    // onChange={onchange}
                                    type="file"
                                    className={`w-full cursor-pointer px-2 py-1 h-full  rounded-md outline-none`}
                                    placeholder='choose file'
                                    onChange={handleImage}
                                />
                                <div className=""></div>
                                <button className='bg-gradient-to-tr from-primary to bg-purple-700 w-fit px-4 py-2 rounded-md text-white '>browse</button>
                            </label>
                        </div>
                        <ButtonComponent title={'Submit ticket'} bg={`bg-gradient-to-tr mt-5 from-primary to-purple-700 text-white h-12`} />
                    </form>
                </div>
            </div>}



            {screen === 2 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>

                <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                    <div className=" text-xl font-bold">Pending Tickets</div>
                    <hr className='my-2' />
                    <div className="my-5">You have 4 pending tickets, see them below</div>
                    <PendingComponent pending={pendings}/>
                </div>
            </div>}




            {screen === 3 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>

                <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                    <div className=" text-xl font-bold">Active Tickets</div>
                    <hr className='my-2' />
                    <div className="my-5">You have 4 active tickets, see them below</div>
                    <ActiveComponent actives={actives}/>
                </div>
            </div>}



            {screen === 4 && <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>

                <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                    <div className=" text-xl font-bold">Closed Tickets</div>
                    <hr className='my-2' />
                    <div className="my-5">You have 4 closed tickets, see them below</div>
                    <ClosedComponent closed={closed}/>
                </div>
            </div>}


        </div>
    )
}

export default TicketsStatus