import { db } from "../utils/db.server";

export const getAllIngredients = async () => {
    return db.ingredient.findMany();
};

export const createIngredient = async (name: string) => {
    return db.ingredient.create({
        data: {
            name,
        },
    });
};

export const updateIngredient = async (id: number, name: string) => {
    return db.ingredient.update({
        where: { id },
        data: {
            name,
        },
    });
};

export const deleteIngredient = async (id: number) => {
    return db.ingredient.delete({
        where: { id },
    });
};
