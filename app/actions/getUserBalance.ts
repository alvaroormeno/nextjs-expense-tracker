'use server'

import { db } from "@/lib/db"
import {auth} from "@clerk/nextjs/server"

async function getUserBalance(): Promise<{balance?: number; error?: string;}> {

    const {userId} = await auth()

    if (!userId) {
        return {error: 'User not found'}
    }


    try {
        // GET ALL USERS TRANSACTIONS
        const userTransactions = await db.transactions.findMany({
            where: {
                userId: userId,
            },
        });

        // CALCULATE BALANCE USING REDUCE, STARTING FROM 0
        const balance = userTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        return {balance}
    } catch (error) {
        return {error: 'Error fetching balance'}
    }

}

export default getUserBalance