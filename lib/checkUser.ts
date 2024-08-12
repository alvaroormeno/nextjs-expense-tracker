import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";


export const checkUser = async () => {
    const user = await currentUser();

    // CHECK CLERK IF USER IS NULL
    if (!user) {
        return null;
    }

    // CHECK IF USER EXISTS IN DATABASE
    const existingUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
    });
    console.log('existingUser', existingUser);

    // IF USER EXISTS RETURN USER
    if (existingUser) {
        return existingUser;
    }

    // IF USER DOES NOT EXIST CREATE USER
    const newDBUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    })

    console.log('newDBUser', newDBUser);

    return newDBUser;
}