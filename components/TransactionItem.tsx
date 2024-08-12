'use client'
import React from 'react'

import { addCommas } from '@/lib/utils'
import { toast } from 'react-toastify'

import deleteTransaction  from '@/app/actions/deleteTransaction'

const TransactionItem = ({transaction}: {transaction: Transaction}) => {

    const sign = transaction.amount < 0 ? '-' : '+'

    const handleDeleteTransaction = async (id: string) => {

        const confirmed = window.confirm('Are you sure you want to delete this transaction?')

        if (!confirmed) {
            return
        }
            
        const result = await deleteTransaction(id)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.message)
        }
    }

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text}
            <span>
                {sign}${addCommas(Math.abs(transaction.amount))}
            </span>

            {/*  DELETE BUTTON */}
            <button className='delete-btn' onClick={() => handleDeleteTransaction(transaction.id)}>x</button>
        </li>
    )
}

export default TransactionItem