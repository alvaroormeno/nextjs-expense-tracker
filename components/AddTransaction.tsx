'use client'
import addTransaction from '@/app/actions/addTransaction'
import React from 'react'

const AddTransaction = () => {

    const clientAction = async (formData: FormData) => {

        const result = await addTransaction(formData)

        if (result.error) {
            alert(result.error)
        } else {
            alert('Transaction Added')
            console.log(result.data)
        }
    }

    return (
        <>
            <h3>Add Transaction</h3>

            <form action={clientAction}>
                <div className='form-control'>

                    <label htmlFor="text">Text</label>

                    <input type="text" id='text' name='text' placeholder='Enter Text...' />

                </div>

                <div className='form-control'>

                    <label htmlFor="amount">Amount <br/> (negative - expense, positive - income)</label>

                    <input type="number" id='amount' name='amount' placeholder='Enter Amount...' step='0.01' />

                </div>
                
                <button className='btn'>
                    Add Transaction
                </button>
            </form>
        </>
    )
}

export default AddTransaction