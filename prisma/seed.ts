import { db } from "../src/utils/db.server";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isAdmin: boolean;
};

type Drink = {
    name: string;
    description: string;
    imageUrl: string;
    recipe: string;
    isAlcoholic: boolean;
};

type Category = {
    name: string;
    description: string;
    imageUrl: string;
};

type Glass = {
    name: string;
};

type Ingredient = {
    name: string;
};

type APIKey = {
    key: string;
};

async function seed(): Promise<void> {
    await Promise.all(
        getUsers().map((user) => {
            return db.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    isAdmin: user.isAdmin,
                }
            });
        })
    );

    const user = await db.user.findFirst({
        where: {
            firstName: 'John',
        }
    });

    console.log(user);
}

function getUsers(): Array<User> {
    return [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '1234567890',
            password: 'password123',
            isAdmin: true,
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            phone: '9876543210',
            password: 'password456',
            isAdmin: false,
        },
    ];
}

function getDrinks(): Array<Drink> {
    return [
        {
            name: 'Mojito',
            description: 'Refreshing cocktail with lime and mint',
            imageUrl: 'https://example.com/mojito.jpg',
            recipe: '1. Muddle mint leaves and lime juice...',
            isAlcoholic: true,
        },
        {
            name: 'Cosmopolitan',
            description: 'Classic vodka-based cocktail',
            imageUrl: 'https://example.com/cosmo.jpg',
            recipe: '1. Combine vodka, cranberry juice, lime juice...',
            isAlcoholic: true,
        },
    ];
}

function getCategories(): Array<Category> {
    return [
        {
            name: 'Cocktails',
            description: 'Mixed alcoholic beverages',
            imageUrl: 'https://example.com/cocktails.jpg',
        },
        {
            name: 'Mocktails',
            description: 'Non-alcoholic mixed beverages',
            imageUrl: 'https://example.com/mocktails.jpg',
        },
    ];
}

function getGlasses(): Array<Glass> {
    return [
        {
            name: 'Highball',
        },
        {
            name: 'Martini',
        },
    ];
}

function getIngredients(): Array<Ingredient> {
    return [
        {
            name: 'Lime',
        },
        {
            name: 'Mint',
        },
        {
            name: 'Vodka',
        },
        {
            name: 'Cranberry Juice',
        },
    ];
}

function getAPIKeys(): Array<APIKey> {
    return [
        {
            key: 'API_KEY_1',
        },
        {
            key: 'API_KEY_2',
        },
    ];
}

seed().catch(console.error);