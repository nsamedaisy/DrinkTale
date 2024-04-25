import { db } from "../utils/db.server";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    password: string;
    isAdmin: boolean;
};

export const getAllUsers = async (): Promise<User[]> => {
    // return this.db.user.findMany()
    return db.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            password: true,
            isAdmin: true,
        },
    })
}

export const getUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        }
    })
}