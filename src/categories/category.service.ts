import { db } from "../utils/db.server";

export const getAllCategories = async () => {
    return db.category.findMany();
};

export const createCategory = async (name: string, description: string) => {
    return db.category.create({
        data: {
            name,
            description,
        },
    });
};

export const updateCategory = async (id: number, name: string, description: string) => {
    return db.category.update({
        where: { id },
        data: {
            name,
            description,
        },
    });
};

export const deleteCategory = async (id: number) => {
    return db.category.delete({
        where: { id },
    });
};
