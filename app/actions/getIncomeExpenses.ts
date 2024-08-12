'use server'

import { db } from "@/lib/db"
import {auth} from "@clerk/nextjs/server"

type IncomeExpenses = {
    income?: number;
    expense?: number;
    error?: string;
}

async function getIncomeExpenses(): Promise<IncomeExpenses> {

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

        // GET ONLY AMOUNTS FROM TRANSACTIONS
        const amounts = userTransactions.map(transaction => transaction.amount)

        // GET INCOME BY FILTERING POSITIVE AMOUNTS AND REDUCING THEM
        const income = amounts.filter(amount => amount > 0).reduce((sum, income) => sum + income, 0)

        // GET EXPENSE BY FILTERING POSITIVE AMOUNTS AND REDUCING THEM
        const expense = amounts.filter(amount => amount < 0).reduce((sum, expnse) => sum + expnse, 0)


        return {income: income, expense: Math.abs(expense)}
    } catch (error) {
        return {error: 'Error fetching balance'}
    }

}

export default getIncomeExpenses