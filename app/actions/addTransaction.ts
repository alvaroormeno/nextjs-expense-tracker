'use server'   

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textVal = formData.get('text') as string;
    const amountVal = Number(formData.get('amount'));

    // CHECK FORM VALUES    
    if (!textVal || !amountVal) {
        return { error: 'Please provide text and amount' };
    }

    // MAKE SURE TEXT IS A STRING AND AMOUNT IS A NUMBER
    const text: string = textVal.toString();
    const amount: number = parseFloat(amountVal.toString())


    // GET CLERCK LOGGED IN USER
    const { userId } = auth()

    // CHECK LOGGES IN USER EXISTS
    if (!userId) {
        return { error: 'User not found' };
    }


    try {
        
        // CREATE TRANSACTION
        const TransactionData: TransactionData = await db.transactions.create({
            data: {
                text: text,
                amount: amount,
                userId: userId,
            }
        })

        // REFRESH PAGE AFTER NEW TRANSACTION ADDED TO DATABASE
        revalidatePath('/')
    
        return { data: TransactionData };


    } catch (error) {
        return {error: 'transaction not added'}
    }
}

export default addTransaction;