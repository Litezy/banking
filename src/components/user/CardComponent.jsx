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

const CardComponent = () => {

    const refdiv = useRef(null)
    const [loading, setLoading] = useState(false)
    const [add,setAdd] = useState(false)

    const [cards, setCards] = useState(
        {
            type: '',
            card_no: '',
            cvv: '',
            card_name: '',
            exp: ''
        },

    )


    const [allcards, setAllcards] = useState([])

    const fetchUserCards = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.all_cards)
            if (response.status !== 200) return;
            setAllcards(response?.user?.usercards)
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])

    useEffect(() => {
        fetchUserCards()
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

    const handleCardNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 16); // Limit to 16 digits
        const formattedValue = value.match(/.{1,4}/g)?.join('-') || value; // Insert hyphens every 4 digits
        setCards({
            ...cards,
            card_no: formattedValue
        });
    };

    const addCardsArr = async (e) => {
        e.preventDefault()
        if (!cards.type) return errorMessage('Card type is required')
        if (!cards.card_name) return errorMessage('Card name is required')
        if (!cards.card_no) return errorMessage('Card number is required')
        if (!cards.cvv) return errorMessage('Card cvv is required')
        if (!cards.exp) return errorMessage('Card expiry date is required')
        const formdata = {
            name: cards.card_name,
            card_no: cards.card_no,
            cvv: cards.cvv,
            exp: cards.exp,
            type: cards.type
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.auth.create_card, formdata)
            if (response.status === 200) {
                setCards({ card_name: '', card_no: '', cvv: '', exp: '', type: '' })
                successMessage(response.msg)
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
                    <ModalLayout setModal={setAdd} clas={`lg:w-[60%] w-full mx-auto`}>
                        <div ref={refdiv} className={`w-full relative mx-auto rounded-lg bg-white  py-6 px-5 `}>
                            {loading &&
                                <div className=" absolute h-full items-center flex justify-center z-50 w-full">
                                    <Loader />
                                </div>
                            }
                            <div className="text-xl font-semibold text-balance">Enter Card Details</div>
                            <div className="my-5 flex flex-col items-start gap-5">
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card type:</div>
                                    <div className="w-1/2 ">
                                        <label className='w-1/2 ' >
                                            <select name="type" value={cards.type} onChange={handleChange} className='w-full outline-none h-14 border px-2 py-1 rounded-md' id="">
                                                <option value="">Select Card Type</option>
                                                <option value="visa">Visa</option>
                                                <option value="mastercard">Mastercard</option>
                                            </select>

                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card No:</div>
                                    <div className="w-1/2">
                                        <FormComponent formtype={'text'} value={cards.card_no} onchange={handleCardNumberChange} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card Holder Name:</div>
                                    <div className="w-1/2">
                                        <FormComponent formtype={'text'} name={`card_name`} value={cards.card_name} onchange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card CVV:</div>

                                    <div className="w-1/4">
                                        <FormComponent formtype={'cvv'} name={`cvv`} value={cards.cvv} onchange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-lg ">Card Exp:</div>
                                    <div className="w-1/4">
                                        <FormComponent formtype={'text'} name={`exp`} value={cards.exp} onchange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <button disabled={loading ? true : false} onClick={addCardsArr} className=' h-12 w-full bg-gradient-to-tr from-primary to-purple-700  text-white rounded-lg'>Add Card</button>
                        </div>
                    </ModalLayout>
                </>
            }

            <div className="flex mb-2 w-full items-center justify-between">
                <div className=" text-xl font-semibold">My Cards</div>
                {allcards.length < 2 &&
                    <Formbutton onClick={() => setAdd(true)} label="Add New Card" />
                }
            </div>
            {Array.isArray(allcards) && allcards.length > 0 ? <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                {allcards.map((item, i) => {
                    return (
                        <div key={i} className={`h-[17rem] w-full bg-gradient-to-tr from-primary to-purple-700  rounded-lg py-6 px-5`}>
                            <div className="flex flex-col text-white h-full justify-between">
                                <div className="flex items-center  justify-between">
                                    <div className="font-semibold text-xl">Credit</div>
                                    <img src={item.type === 'visa' ? visacardimg : mastercardimg} className={`w-24 ${item.type === 'visa' ? 'h-20' : 'h-fit'} `} alt="" />
                                </div>
                                <div className="mb-2 flex  items-center justify-between  text-white text-base">
                                    <div className="flex-col flex items-start">
                                        <div className="text-sm">Card No.</div>
                                        <div className="text-xl font-semibold">{item.card_no}</div>
                                    </div>
                                    <div className="flex items-center mr-3 flex-col">
                                        <div className="">cvv</div>
                                        <div className="text-xl font-bold">{item.cvv}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start flex-col">
                                        <div className="text-sm">Card holder</div>
                                        <div className="font-bold text-2xl">{item.name}</div>
                                    </div>
                                    <div className="flex items-center flex-col">
                                        <div className="text-sm">exp</div>
                                        <div className="font-bold text-xl">{item.exp}</div>
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
                            <div key={i} className={`h-fit w-full  bg-gradient-to-tr from-primary to-purple-700 rounded-lg py-6 px-5`}>
                                <div className="flex gap-4 flex-col text-white h-full justify-between">
                                    <div className="flex items-center  justify-between">
                                        <div className="flex items-center gap-1">
                                            {new Array(4).fill(0).map((ite, i) => (
                                                <div key={i} className=""><FaAsterisk /></div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {new Array(5).fill(0).map((ite, i) => (
                                                <div key={i} className=""><FaAsterisk /></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex  items-center justify-between  text-white text-base">
                                        <div className="flex-col flex items-start">
                                            <div className="text-sm uppercase">Card No.</div>
                                            <div className="flex items-center gap-1">
                                                {new Array(10).fill(0).map((ite, i) => (
                                                    <div key={i} className=""><FaAsterisk /></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center mr-3 flex-col">
                                            <div className=" uppercase">cvv</div>
                                            <div className="flex items-center gap-1">
                                                {new Array(3).fill(0).map((ite, i) => (
                                                    <div key={i} className=""><FaAsterisk /></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start flex-col">
                                            <div className="text-sm uppercase">Card holder</div>
                                            <div className="flex items-center gap-1">
                                                {new Array(6).fill(0).map((ite, i) => (
                                                    <div key={i}
                                                     className=""><FaAsterisk /></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-col">
                                            <div className="text-sm uppercase">exp</div>
                                            <div className="flex items-center gap-1">
                                                {new Array(3).fill(0).map((ite, i) => (
                                                    <div key={i} className=""><FaAsterisk /></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            }
            <div className="font-bold mt-1">* max of two credit/debit cards</div>
        </div>
    )
}

export default CardComponent