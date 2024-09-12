import React, { useCallback, useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Apis, GetApi, PostApi } from 'services/Api';
import FormComponent from 'utils/FormComponent';
import { errorMessage, successMessage } from 'utils/functions';
import Summary from './Summary';
import moment from 'moment';
import ModalLayout from 'utils/ModalLayout';
import ButtonComponent from 'utils/ButtonComponent';
import Loader from 'utils/Loader';

const VirtualCards = () => {
    const profile = useSelector((state) => state.profile.profile)
    const [cardsArr, setCardsArr] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchVirtualRequests = useCallback(async () => {
        try {
            const res = await GetApi(Apis.admin.req_cards)
            if (res.status === 200) {
                setCardsArr(res.data)
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        }
    }, [])

    useEffect(() => {
        fetchVirtualRequests()
    }, [])

    const TableHeaders = [
        "User",
        "Email",
        "Card Type",
        "Visa Type",
        "Date Requested",
        "Create"
    ]

    const [cards, setCards] = useState({
        card_no: "",
        cvv: "",
        exp: "",
    })
    const [selected, setSelected] = useState({})
    const [view, setView] = useState(false)

    const handleChange = (e) => {
        setCards({
            ...cards,
            [e.target.name]: e.target.value
        })
    }
    const handleCardNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 16); // Limit to 16 digits
        const formattedValue = value.match(/.{1,4}/g)?.join('-') || value; // Insert hyphens every 4 digits
        setCards({
            ...cards,
            card_no: formattedValue
        });
    };
    const handleCvv = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 3); // Limit to 3 digits
        setCards({
            ...cards,
            cvv: value
        });
    };
    const handleExp = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
        value = value.substring(0, 4); // Limit to 4 digits
        const formattedVal = value.match(/.{1,2}/g)?.join(`/`) || value
        setCards({
            ...cards,
            exp: formattedVal
        });
    };

    const Modal = (item) => {
        setSelected(item)
        setView(true)
    }
    // console.log(selected)
    const createCard = async (e) => {
        e.preventDefault()
        if (!cards.card_no) return errorMessage('Card number is required')
        if (!selected?.card_owner?.firstname || !selected?.card_owner?.lastname) return errorMessage('Card Holder  is required')
        if (!selected?.card_type) return errorMessage('No card chosen  ')
        if (!cards.cvv) return errorMessage('Card cvv is required')
        if (!cards.exp) return errorMessage('Card exp is required')
        const formdata = {
            type: selected?.card_type,
            card_no: cards.card_no,
            name: `${selected?.card_owner?.firstname} ${selected?.card_owner?.lastname}`,
            cvv: cards.cvv,
            exp: cards.exp,
            visa_type: selected?.visa_type ? selected?.visa_type : '',
            id: selected?.id
        }
        // return console.log(formdata)
        setLoading(true)
        try {
            const response = await PostApi(Apis.admin.create_cards, formdata)
            if (response.status !== 200) return errorMessage(response.msg)
                setCards({
                    card_no: "",
                    cvv: "",
                    exp: "",
                })
                successMessage(response.msg)
            await new Promise((resolve, reject) => setTimeout(resolve, 2000))
           fetchVirtualRequests()
           setView(false)
        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }


    }
    return (
        <div className='w-11/12 mx-auto'>

            <div className="lg:w-2/4 w-3/4 mx-auto">
                <Summary color='bg-blue-500 text-white' title={'Total Virtual Card Requests'} data={cardsArr.length} />
            </div>

            {view &&
                <ModalLayout setModal={setView} clas={`w-11/12 lg:w-[60%] mx-auto`}>
                    <form onSubmit={createCard} className="w-full bg-white p-5 rounded-md">

                        {loading &&
                            <div className="absolute top-0  backdrop-blur-sm w-full z-40 h-full rounded-md left-1/2 -translate-x-1/2">
                                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-fit p-5 rounded-md bg-white"><Loader />
                                </div>
                            </div>
                        }

                        <div className="text-xl text-center font-bold mb-10 "> <span className='capitalize'>{selected?.card_type}</span> {selected?.card_type === 'mastercard' ? '' : 'card'} request from {selected?.card_owner?.firstname} {selected?.card_owner?.lastname}</div>
                        <div className="flex flex-col items-start gap-5">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg ">Card No:</div>
                                <div className="w-1/2">
                                    <FormComponent formtype={'text'} value={cards.card_no} onchange={handleCardNumberChange} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg ">Card Holder Name:</div>
                                <div className="w-1/2">
                                    <FormComponent formtype={'text'} value={`${selected?.card_owner.firstname} ${selected?.card_owner.lastname}`} />
                                </div>
                            </div>
                            {selected?.visa_type && <div className="flex items-center justify-between w-full">
                                <div className="text-lg ">Visa Type:</div>
                                <div className="w-1/2">
                                    <FormComponent formtype={'text'} value={selected?.visa_type} />
                                </div>
                            </div>}
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg ">Card CVV:</div>

                                <div className="w-1/4">
                                    <FormComponent name={`cvv`} value={cards.cvv} onchange={handleCvv} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg ">Card Exp:</div>
                                <div className="w-1/4">
                                    <FormComponent formtype={'text'} name={`exp`} value={cards.exp} onchange={handleExp} />
                                </div>
                            </div>

                            <div className="w-11/12 mx-auto">
                                <ButtonComponent title={`Create Card`} bg={`bg-blue-500 text-white h-12 rounded-lg `} />
                            </div>
                        </div>
                    </form>
                </ModalLayout>
            }

            <div className="relative overflow-x-auto rounded-md mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className=" bg-blue-500 text-xl text-white">
                        <tr>
                            {TableHeaders.map((item, index) => (
                                <th scope="col" key={index} className="px-3 py-3 text-sm truncate">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cardsArr.length > 0 ? cardsArr.map((item, i) => (
                            <tr className="bg-white border-b " key={i}>
                                <td className="px-3 py-3">
                                    {item.card_owner?.firstname} {item.card_owner?.lastname}
                                </td>
                                <td className="px-3 py-3">
                                    {item.card_owner?.email}
                                </td>
                                <td className="px-3 py-3">
                                    {item.card_type}
                                </td>
                                <td className="px-3 py-3">
                                    {item.visa_type ? item.visa_type : 'nil'}
                                </td>

                                <td className="px-3 py-3">
                                    {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
                                </td>
                                <td className="px-3 py-3">
                                    <button onClick={() => Modal(item)}
                                        className='bg-blue-500 text-white w-fit px-3 py-1 rounded-md'>Create card</button>
                                </td>

                            </tr>
                        )) :
                            <tr className=" w-full text-lg truncate font-semibold flex items-center justify-center">
                                No virtual card requests
                            </tr>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default VirtualCards