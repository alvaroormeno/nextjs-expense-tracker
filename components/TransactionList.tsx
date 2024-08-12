import React from 'react'

import getTransactions from '@/app/actions/getTransactions'

import TransactionItem from './TransactionItem'

const TransactionList = async () => {

    const { transactions, error } = await getTransactions()


    return !error ? (
        <div className='transacton-list-main-container'>
            <h3>History</h3>
            <ul className='list-container'>
                { transactions && transactions.map((transaction: Transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </div>
    ) : (
        <p>{error}</p>
    )
}

export default TransactionList