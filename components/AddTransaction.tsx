'use client'
import addTransaction from '@/app/actions/addTransaction'
import React, {useRef} from 'react'
import { toast } from 'react-toastify'

const AddTransaction = () => {

    const formRef = useRef<HTMLFormElement>(null)

    const clientAction = async (formData: FormData) => {

        const result = await addTransaction(formData)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Transaction Added')
            console.log(result.data)

            // RESET FORM INPUTS
            formRef.current?.reset()
        }
    }

    return (
        <>
            <h3>Add Transaction</h3>

            <form action={clientAction} ref={formRef} className='form-container'>
                <div className='form-control'>

                    <label htmlFor="text">Transaction Name</label>

                    <input type="text" id='text' name='text' placeholder='Enter Name...' />

                </div>

                <div className='form-control'>

                    <label htmlFor="amount">Amount</label>

                    <input type="number" id='amount' name='amount' placeholder='Example: 5.50 or -5.50' step='0.01' />

                </div>
                
                <button className='btn'>
                    Add Transaction
                </button>
            </form>
        </>
    )
}

export default AddTransaction