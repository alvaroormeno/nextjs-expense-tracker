'use server'   

import { auth } from "@clerk/nextjs/server";

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


    const TransactionData: TransactionData = {
        text: text,
        amount: amount
    }

    return { data: TransactionData };
}

export default addTransaction;