import { db } from "../utils/db.server";

type Glass = {
    id: number;
    name: string;
};

// Get all glasses
export const getAllGlasses = async (): Promise<Glass[]> => {
    const drinks = await db.drink.findMany();
    return drinks as Glass[];
}

// Get a single glass by ID
export const getGlassById = async (id: number): Promise<Glass | null> => {
    return db.glass.findUnique({
        where: { id },
    });
}

// Create a new glass
export const createGlass = async (glass: Omit<Glass, "id">): Promise<Glass> => {
    return db.glass.create({
        data: glass,
    });
}

// Update an existing glass
export const updateGlass = async (glass: Omit<Glass, "id">, id: number): Promise<Glass> => {
    return db.glass.update({
        where: { id: Number(id) },
        data: glass,
    });
}

// Delete a glass
export const deleteGlass = async (id: number): Promise<void> => {
    await db.glass.delete({
        where: { id },
    });
}
