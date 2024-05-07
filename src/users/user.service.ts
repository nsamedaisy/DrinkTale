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

// export const getAllUsers = async (): Promise<User[]> => {
//     // return this.db.user.findMany()
//     return db.user.findMany({
//         select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             email: true,
//             phone: true,
//             password: true,
//             isAdmin: true,
//         },
//     })
// }
export const getAllUsers = async (): Promise<User[]> => {
    return db.user.findMany();
}

export const getUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },

    })
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    // const { firstName, lastName} = user;
    return db.user.create({
        data: user,
    })
};

export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    return db.user.update({
        where: { id: Number(id) },
        data: user
    })
}

export const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id: +id
        }
    })
}