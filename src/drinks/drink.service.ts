import { db } from "../utils/db.server";

type Drink = {
    id: number;
    name: string;
    description: string | null;
    imageUrl: string | null;
    recipe: string | null;
    isAlcoholic: boolean;
    userId: number;
    categoriesId?: number;
    glassId: number | null;
    ingredientsId?: number;
}

export const getAllDrinks = async (): Promise<Drink[]> => {
    const drinks = await db.drink.findMany();
    return drinks as Drink[];
}

export const getDrink = async (id: number): Promise<Drink | null> => {
    const drink = await db.drink.findUnique({
        where: {
            id,
        }
    });
    return drink as Drink | null;
}


export const createDrink = async (drink: Omit<Drink, "id">): Promise<Drink> => {
    return db.drink.create({
        data: drink,
    })
}

export const updateDrink = async (drink: Omit<Drink, "id">, id: number): Promise<Drink> => {
    return db.drink.update({
        where: { id: Number(id) },
        data: drink,
    })
}

export const deleteDrink = async (id: number): Promise<void> => {
    await db.drink.delete({
        where: {
            id: +id
        }
    })
}