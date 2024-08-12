import React from 'react'

import getTransactions from '@/app/actions/getTransactions'

import TransactionItem from './TransactionItem'

const TransactionList = async () => {

    const { transactions, error } = await getTransactions()


    return !error ? (
        <>
        <h3>History</h3>
        <ul className='list'>
            { transactions && transactions.map((transaction: Transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </ul>
        </>
    ) : (
        <p>{error}</p>
    )
}

export default TransactionList