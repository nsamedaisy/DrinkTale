import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./users/user.router";
import { drinkRouter } from "./drinks/drink.router"
import { glassRouter } from "./glasses/glass.router";

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});