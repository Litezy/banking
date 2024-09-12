import React, { useCallback, useEffect, useRef, useState } from 'react'
import mastercardimg from '../../assets/dashboard/mastercard.png'
import visacardimg from '../../assets/dashboard/visa.png'
import FormComponent from 'utils/FormComponent'
import { errorMessage, successMessage } from 'utils/functions'
import { FaAsterisk } from "react-icons/fa";
import Loader from 'utils/Loader'
import ModalLayout from 'utils/ModalLayout'
import { Apis, GetApi, PostApi } from 'services/Api'
import Formbutton from 'utils/Formbutton'
import chip from 'assets/chip-sm.png'
import ButtonComponent from 'utils/ButtonComponent'

const CardComponent = () => {

    const refdiv = useRef(null)
    const [loading, setLoading] = useState(false)
    const [add, setAdd] = useState(false)

    const [cards, setCards] = useState(
        {
            type: '',
            visa_type: ''
        },

    )


    const [allcards, setAllcards] = useState([])
    const [cardRequests, setCardRequests] = useState([])

    const fetchUserCards = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.all_cards)
            if (response.status !== 200) return;
            setAllcards(response?.user?.usercards)
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])
    const fetchCardRequests = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.card_requests)
            if (response.status !== 200) return;
            setCardRequests(response?.user?.card_owner)
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])

    useEffect(() => {
        fetchUserCards()
        fetchCardRequests()
    }, [fetchUserCards])

    const handleChange = (e) => {
        setCards({
            ...cards,
            [e.target.name]: e.target.value
        })
    }



    useEffect(() => {
        if (refdiv) {
            window.addEventListener('click', e => {
                if (refdiv.current !== null && !refdiv.current.contains(e.target)) {
                    setAdd(false)
                }
            }, true)
        }
    }, [])

    

    const addCardsArr = async (e) => {
        e.preventDefault()
        if (!cards.type) return errorMessage('Card type is required')
        if (cards.type === 'visa' && !cards.visa_type) return errorMessage('Visa type is required for visa cards')
        const formdata = {
            visa_type: cards.visa_type ? cards.visa_type :'',
            card_type: cards.type
        }
        // return console.log(formdata)
        setLoading(true)
        try {
            const response = await PostApi(Apis.auth.request_card, formdata)
            if (response.status === 200) {
                setCards({ visa_type:'',type: '' })
                successMessage(response.msg)
                await new Promise((resolve, reject) => setTimeout(resolve, 2000))
                fetchCardRequests()
                fetchUserCards()
                setAdd(false)
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className='w-full'>
            {add &&
                <>
                    <ModalLayout setModal={setAdd} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                        <div ref={refdiv} className={`w-full relative mx-auto rounded-lg bg-white  py-6 px-5 `}>
                            {loading &&
                                <div className=" absolute h-full items-center flex justify-center z-50 w-full">
                                    <Loader />
                                </div>
                            }
                            <div className="text-xl font-semibold text-balance">Enter Card Request below</div>
                            <div className="my-5 flex flex-col items-start gap-5">
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card type:</div>
                                    <div className="w-1/2 ">
                                        <label className='w-1/2 ' >
                                            <select name="type" value={cards.type} onChange={handleChange} className='w-full outline-none h-14 border px-2 py-1 rounded-md' id="">
                                                <option value="">--select card type--</option>
                                                <option value="visa">Visa</option>
                                                <option value="mastercard">Mastercard</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                {cards.type === 'visa' &&
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-lg ">Visa Type:</div>
                                        <div className="w-1/2 ">
                                            <label className='w-1/2 ' >
                                                <select name="visa_type" value={cards.visa_type} onChange={handleChange} className='w-full outline-none h-14 border px-2 py-1 rounded-md' id="">
                                                    <option value="">--select visa-type</option>
                                                    <option value="visa classic">Visa Classic</option>
                                                    <option value="visa gold">Visa Gold</option>
                                                    <option value="visa platinum">Visa Platinum</option>
                                                    <option value="visa infinite">Visa Infinite</option>
                                                    <option value="visa buiness">Visa Business</option>
                                                    <option value="visa corporate">Visa Corporate</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            <button disabled={loading ? true : false} onClick={addCardsArr} className=' h-12 w-full lg:w-8/12 mx-auto bg-gradient-to-tr from-primary to-purple-700  text-white rounded-lg'>Send Request</button>
                        </div>
                    </ModalLayout>
                </>
            }

            <div className="flex mb-2 w-full items-center justify-between">
                <div className=" text-xl font-semibold">My Cards</div>
                {cardRequests.length === 0 && allcards.length === 0 &&
                    <div className="w-fit ">
                        <ButtonComponent onclick={() => setAdd(true)} title="Request Virtual Card" bg={`text-white bg-gradient-to-tr px-3 from-primary text-sm to-purple-700 h-12`} />
                    </div>
                }
                {cardRequests.length === 1 && allcards.length === 0 &&
                    <div className="w-fit font-bold text-base">First virtual card request in process</div>
                }
                {cardRequests.length === 1 && allcards.length === 1 &&
                    <div className="w-fit ">
                    <ButtonComponent onclick={() => setAdd(true)} title="Request Another  Card" bg={`text-white bg-gradient-to-tr px-3 from-primary text-sm to-purple-700 h-12`} />
                </div>
                }
                {cardRequests.length > 1 && allcards.length === 1 &&
                    <div className="w-fit font-bold text-base">Second virtual card request in process</div>
                }
                
            </div>
            {Array.isArray(allcards) && allcards.length > 0 ? <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                {allcards.map((item, i) => {
                    return (
                        <div key={i} className={`lg:h-[17rem] h-fit w-full bg-gradient-to-tr from-primary to-purple-700  rounded-lg py-4 px-5`}>
                            <div className="flex flex-col text-white h-full justify-between">
                                <div className="flex items-center  justify-between">
                                    <div className={`w-fit  ${item.type === 'visa' ? 'h-16' : 'h-fit'} bg-white rounded-md flex items-center justify-center`}>
                                        <img src={item.type === 'visa' ? visacardimg : mastercardimg} className={`w-24 `} alt="" />
                                    </div>
                                    {item.visa_type && <div className="w-fit px-4 py-2 rounded-md bg-white text-primary font-bold text-base capitalize italic">{item.visa_type}</div>}
                                    <img src={chip} className={`w-fit h-14 `} alt="" />
                                </div>
                                <div className="mb-2 mt-2 flex  items-center justify-between  text-white text-base">
                                    <div className="flex-col flex items-start">
                                        <div className="text-sm">Card No.</div>
                                        <div className="text-lg font-semibold">{item.card_no}</div>
                                    </div>
                                    <div className="flex items-center mr-3 flex-col">
                                        <div className="">cvv</div>
                                        <div className="text-lg font-bold">{item.cvv}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start flex-col">
                                        <div className="text-sm">Card holder</div>
                                        <div className="font-bold text-xl">{item.name}</div>
                                    </div>
                                    <div className="flex items-center flex-col">
                                        <div className="text-sm">exp</div>
                                        <div className="font-bold text-lg">{item.exp}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> :
                <div className="flex items-center flex-col lg:flex-row justify-between gap-5 lg:gap-10">
                    {new Array(2).fill(0).map((item, i) => {
                        return (
                            <div key={i} className={`h-60 w-full  bg-gradient-to-tr from-primary to-purple-700 rounded-lg py-6 px-5`}>
                                <div className="flex gap-4 flex-col text-white h-full justify-between">
                                    <div className="w-16 p-3 bg-white h-12 rounded-md ml-auto mr-2">
                                    </div>
                                    <div className="flex w-full  items-center justify-between  text-white text-base">
                                        <div className=" w-3/4 flex-col flex items-start">
                                            <div className="flex items-center gap-1 text-lg">
                                                0000 - 0000 - 0000 - 0000 - 0000
                                            </div>
                                        </div>
                                        <div className="w-1/4 bg-white rounded-md h-3"></div>
                                    </div>
                                    <div className="w-full bg-white rounded-md h-3"> </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            }
            <div className="font-light mt-1">* max of two credit/debit cards</div>
        </div>
    )
}

export default CardComponent