'use server'

import { db } from "@/lib/db"
import {auth} from "@clerk/nextjs/server"

type getTransactionsPromise = {
    transactions?: Transaction[];
    error?: string;
}

async function getTransactions(): Promise<getTransactionsPromise> {

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
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {transactions: userTransactions}

        
    } catch (error) {
        return {error: 'Error fetching balance'}
    }

}

export default getTransactions