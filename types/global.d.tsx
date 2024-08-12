
export { };

declare global {

    type Transaction = {
        id: string;
        text: string;
        amount: number;
        userId: string;
        createdAt: Date;
    }
    

}