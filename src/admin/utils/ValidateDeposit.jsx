import Summary from 'admin/adminComponents/Summary'
import React, { useCallback, useEffect, useState } from 'react'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { Apis, GetApi, PostApi, profileImg } from 'services/Api'
import { errorMessage, successMessage } from 'utils/functions'
import moment from 'moment'
import ModalLayout from 'utils/ModalLayout'
import FormComponent from 'utils/FormComponent'
import ButtonComponent from 'utils/ButtonComponent'
import Loader from 'utils/Loader'

const ValidateDeposit = ({ setScreen }) => {

  const [proofs, setProofs] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [modal, setModal] = useState(false)
  const [validate, setValidate] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const getProofs = useCallback(async () => {
    try {
      const res = await GetApi(Apis.admin.all_proofs)
      if (res.status === 200) {
        setProofs(res.data)
        // console.log(res.data)
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error.message)
    }
  }, [])
  const [forms, setForms] = useState({
    amount: ''
  })

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getProofs()
  }, [])

  const handleValidate = (items) => {

  }


  const proceed = () => {
    if (!forms.amount) return errorMessage(`Input amount is required to proceed`)
    if (forms.amount <= 0) return errorMessage(`No negative amount`)
    setValidate(false)
    setConfirm(true)
  }
  const selectItem = (item) => {
    setSelectedItem(item)
  }

  const ValidatePayment = async (e) => {
    e.preventDefault()
    const formdata = {
      id: selectedItem?.id,
      amount: forms.amount
    }
    setConfirm(false)
    setLoading(true)
    try {
      const res = await PostApi(Apis.admin.validate_depo, formdata)
      if (res.status == 200) {
        successMessage(res.msg)
        setModal(false)
        getProofs()
      }else{
        errorMessage(res.msg)
      }
    } catch (error) {
      errorMessage(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div className="w-full flex items-center justify-between">

        {modal &&
          <ModalLayout setModal={setModal} clas={`w-11/12 mx-auto lg:w-[60%]`}>
            <div className="  rounded-lg bg-white p-5 w-full relative">

              {validate &&
                <div className="absolute p-5 rounded-md w-2/4 top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-slate-200 h-fit">

                  <div className="flex items-start gap-1 flex-col">
                    <div className="">Input Amount ($)</div>
                    <FormComponent formtype='phone' name={`amount`} value={forms.amount} onchange={handleChange} placeholder={`amount `} />
                  </div>
                  <div className="flex items-start justify-between mt-5">
                    <button onClick={() => setValidate(false)} className='text-base bg-red-500 text-white w-fit px-4 py-1 rounded-md'>cancel</button>
                    <button onClick={proceed} className='text-base bg-primary text-white w-fit px-4 py-1 rounded-md'>proceed</button>
                  </div>
                </div>

              }
              {confirm &&
                <div className="absolute p-5 rounded-md w-2/4 top-1/2 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-white h-fit">

                  <form onSubmit={ValidatePayment} >
                    <div className="flex flex-col items-start gap-5">
                      <div className="flex items-start gap-5 ">
                        <div className="">Payment ID:</div>
                        <div className="">{selectedItem?.id}</div>
                      </div>
                      <div className="flex items-start gap-1 ">
                        <div className="">Payment amount</div>
                        <FormComponent value={forms.amount} />
                      </div>
                    </div>

                    <div className="w-3/4 mt-5 mx-auto">
                      <ButtonComponent title={`Confirm deposit`} bg={`bg-primary h-10 text-white `} />
                    </div>
                  </form>

                </div>

              }
              {loading &&
                <div className="absolute bg-white  w-fit p-6 rounded-md top-1/2 left-1/2 -translate-x-1/2  ">
                  <Loader />
                </div>
              }

              <div className="my-3 font-semibold text-lg text-center">User Details</div>
              <div className="flex w-full items-start flex-col gap-3">
                <div className="flex items-center gap-1">
                  <div className="">First Name:</div>
                  <div className="">{selectedItem?.userdeposits?.firstname}</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="">Last Name: </div>
                  <div className="">{selectedItem?.userdeposits?.lastname}</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="">Date Submitted</div>
                  <div className=""> {moment(selectedItem.createdAt).format(`DD-MM-YYYY hh:mm A`)}</div>
                </div>
              </div>

              <div className="my-3 font-semibold text-lg text-center">Proof of payment</div>
              <div className="w-11/12 mx-auto">
                <img src={`${profileImg}/deposits/${selectedItem?.userdeposits?.firstname}/${selectedItem.image}`}
                  className='w-fit h-fit'
                  alt="proof-img" />
              </div>

              <div className="w-2/4 mt-5 mx-auto ">
                <button onClick={() => setValidate(true)} className=' bg-primary w-full py-3 rounded-lg  text-white '>Verify</button>
              </div>

            </div>
          </ModalLayout>
        }
        <div onClick={() => setScreen(0)} className="w-fit cursor-pointer mr-auto bg-primary text-white px-3 py-1 rounded-md">
          <IoReturnUpBackOutline className='text-2xl' />
        </div>
        <div className="text-lg font-semibold">Validate Deposits</div>
      </div>

      <div className="w-2/4 mx-auto">
        <Summary color='bg-green-500 text-white' title={'Proof of Deposits'} data={proofs.length} />
      </div>
      <div className=" my-5 text-lg">Check and Validate Deposits</div>

      <div class="relative overflow-x-auto rounded-md">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class=" bg-primary text-xl text-white">
            <tr>
              <th scope="col" class="px-6 py-3">
                User
              </th>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Date Submitted
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {proofs.length > 0 ? proofs.map((item, i) => (
              <tr class="bg-white border-b " key={i}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.userdeposits?.firstname}  {item.userdeposits?.lastname}
                </th>
                <td class="px-6 py-4">
                  {item.userdeposits?.id}
                </td>
                <td class="px-6 py-4">
                  {moment(item.createdAt).format(`DD-MM-YYYY hh:mm A`)}
                </td>
                <td class="px-6 py-4">
                  <button onMouseOver={() => selectItem(item)} onClick={() => setModal(true)} className="bg-primary text-white px-5 rounded-lg py-2">review</button>
                </td>
              </tr>
            )):
          <div className=" w-full text-lg font-semibold flex items-center justify-center">No deposits to validate</div>
          }

          </tbody>
        </table>


      </div>

    </div>
  )
}

export default ValidateDeposit