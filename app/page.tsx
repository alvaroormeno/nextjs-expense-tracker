import React from 'react'

import { currentUser } from '@clerk/nextjs/server'
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';

const HomePage = async () => {

    const user = await currentUser();

    return user ? (
        <main>
            <h1>Welcome, {user.firstName}</h1>
            <AddTransaction/>
        </main>
    ) : (
        <Guest/>
    )
}

export default HomePage