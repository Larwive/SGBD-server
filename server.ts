import * as cors from "cors";

import express = require("express");
import { Client } from "pg";
require("dotenv").config();

export const app = express();


//Routes
import {route_users} from "./routes/users";
import {route_intervention} from "./routes/intervention";
import {route_git} from "./routes/git";
import {route_data} from "./routes/data";


route_users();
route_intervention();
route_git();
route_data();

const port: String | 3001 = process.env.PORT || 3001;
const corsOptions: { origin: string[] } = {
    origin: [
        "https://larwive.github.io",
        "https://api.github.com",
        "http://localhost:3000",
    ], // Reminder : enlever localhost:*
};

app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json());

// Database connection
export const client = new Client({
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
});

async function connectToDatabase(): Promise<void> {
    try {
        await client.connect();
        console.log("Connected to PostgresSQL database.");
    } catch (err) {
        console.error("Error connecting to PostgresSQL:", err);
    }
}

connectToDatabase();

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}.`);
});
