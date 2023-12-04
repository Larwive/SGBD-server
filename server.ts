import * as cors from "cors";

import express = require("express");
import { Client } from "pg";
require("dotenv").config();

export const app = express();

const corsOptions: { origin: string[] } = {
    origin: [
        "https://larwive.github.io",
        "https://api.github.com",
        "http://localhost:3000",
        "*"
    ], // Reminder : enlever localhost:*
};

app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json());
//Routes
import {get_table} from "./routes/getTable";
import {route_intervention} from "./routes/intervention";
import {route_nbHeuresFacturees} from "./routes/nbHeuresFacturees";
import {route_git} from "./routes/git";
import {route_data} from "./routes/data";
import {reset_tables} from "./routes/reset";
import {create_insert_routes, create_insert_routes2, tables_champs, tables_champs2} from "./routes/insertion";

get_table();
route_intervention();
route_git();
route_data();
reset_tables();
route_nbHeuresFacturees();
Array.from(tables_champs.entries()).map(([table_name, fields])=>{create_insert_routes(table_name, fields)});
Array.from(tables_champs2.entries()).map(([table_names, fieldss])=>{create_insert_routes2(table_names, fieldss)});

const port: String | 3001 = process.env.PORT || 3001;



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
