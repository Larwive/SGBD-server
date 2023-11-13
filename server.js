const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const postgres = require('postgres');
const { Client } = require("pg");
require('dotenv').config();

const corsOptions = {
    origin: '*', //'https://larwive.github.io',
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;


// Database connection using the provided code
const client = new Client({
    user: "sgbd_holdclock",
    host: "jnc.h.filess.io",
    database: "sgbd_holdclock",
    password: "65939ca6ee1ffde7b692cc96942297addfb93a74",
    port: "5432",
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
}

connectToDatabase();

// Updated route to handle both GET and POST requests
app.route('/api/data')
    .get(async (req, res) => {
        try {
            const result = await client.query(
                "SELECT $1::text as message", [
                    "Hello world from node.js server ! ",
                ])
            ;
            res.json(result);
        } catch (err) {
            console.error('Error executing query (GET)', err);
            res.status(500).json({ error: 'An error occurred (GET)' });
        }
    })
    .post(async (req, res) => {

        const postData = req.body;
        console.log("${postData.queryType} ${postData.fetching} ${postData.table};");

        try {
            // Assuming postData has necessary information for your query
            const result = await client`${postData.queryType} ${postData.fetching} ${postData.table};`;
            res.json(result);
        } catch (err) {
            console.error('Error executing query (POST)', err);
            res.status(500).json({ error: 'An error occurred (POST)' });
        }
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
