import * as crypto from "crypto"; //Auto GitHub update's security

import express = require("express");
const app = express();
const port: String | 3001 = process.env.PORT || 3001;
import * as cors from "cors";
//const postgres = require('postgres');
import { Client } from "pg";

require("dotenv").config();

import * as cmd from "node-cmd"; //Auto GitHub update

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
const client = new Client({
    user: `${process.env.USER}`,
    host: `${process.env.HOST}`,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`,
    //port: process.env.PORT,
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

// Handle both GET and POST requests for /api/data
app
    .route("/api/data")
    .get(async (req, res): Promise<void> => {
        try {
            const result = await client.query("SELECT $1::text as message", [
                "Hello world from node.js server !",
            ]);
            res.json(result);
        } catch (err) {
            console.error("Error executing query (GET).", err);
            res.status(500).json({ error: "An error occurred (GET)." });
        }
    })
    .post(async (req, res): Promise<void> => {
        const postData = req.body;
        console.log("New query !");

        try {
            const result = await client.query(
                `${postData.queryType} ${postData.fetching} ${postData.table};`
            );
            res.json(result);
        } catch (err) {
            console.error("Error executing query (POST).", err);
            res.status(500).json({ error: "An error occurred (POST)" });
        }
    });

app.post("/users", async (req, res): Promise<void> => {
    try {
        const countQuery = await client.query(`SELECT COUNT(*) FROM clients;`);
        const rowsQuery = await client.query(`SELECT * FROM clients;`);
        res.json({
            count: countQuery.rows[0].count,
            rows: rowsQuery.rows,
        });
    } catch (err) {
        console.error("Error getting the clients table's data.", err);
    }
});

//Auto GitHub update
app.post("/git", (req, res) => {
    let hmac!: crypto.Hmac;
    if (process.env.SECRET !== undefined) {
        hmac = crypto.createHmac("sha1", process.env.SECRET);
    }
    let sig: string =
        "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");

    // If event is "push"
    if (
        req.headers["x-github-event"] === "push" &&
        sig === req.headers["x-hub-signature"]
    ) {
        console.log("Push incoming...");
        if (req.headers["x-github-event"] === "push") {
            cmd.run("chmod 777 git.sh", (err: any, data: string) => {
                if (data) console.log(data);
                if (err) console.log(err);
            }); /* :/ Fix no perms after updating */
            cmd.run("sleep 1 && ./git.sh", (err: any, data: string) => {
                // Run our script
                if (data) console.log(data);
                if (err) console.log(err);
                return res.status(500).json({ error: "Error running git.sh script." });
            });
            cmd.run("refresh", (err: any, data: string) => {
                // Run our script
                if (data) console.log(data);
                if (err) console.log(err);
            }); // Refresh project
            let commits: string =
                req.body.head_commit.message.split("\n").length === 1
                    ? req.body.head_commit.message
                    : req.body.head_commit.message
                        .split("\n")
                        .map((el: string, i: number): string =>
                            i !== 0 ? "                       " + el : el
                        )
                        .join("\n");
            console.log(
                `> [GIT] Updated with origin/main\n         Latest commit: ${commits}`);
        }
    }
    return res.status(200).json({ success: "Webhook received successfully." });
});

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}.`);
});
