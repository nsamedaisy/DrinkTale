import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./users/user.router";
import { drinkRouter } from "./drinks/drink.router"
import { glassRouter } from "./glasses/glass.router";
import { ingredientRouter } from "./ingredients/ingredient.router";
import { categoryRouter } from "./categories/category.router";
import { register, login, logout, generateAPIKey } from "./controllers/authController";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express()

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/drinks", drinkRouter)
app.use("/api/glass", glassRouter)
app.use("/api/ingredients", ingredientRouter)
app.use("/api/categories", categoryRouter)
app.use("/register", register)
app.use("login", login)
app.use("logout", logout)
app.use("apiKey", generateAPIKey)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});