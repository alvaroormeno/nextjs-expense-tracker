import React from 'react'

import { currentUser } from '@clerk/nextjs/server'
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';

import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';

const HomePage = async () => {

    const user = await currentUser();

    return user ? (
        <main>
            <h2>Welcome, {user.firstName}</h2>
            <Balance/>
            <IncomeExpense/>
            <AddTransaction/>
            <TransactionList/>
        </main>
    ) : (
        <Guest/>
    )
}

export default HomePage