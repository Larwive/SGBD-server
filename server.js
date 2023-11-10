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
            const result = await client(
                "SELECT $1::text as message", [
                    "Hello world!",
                ])
            ;
            res.json(result);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'An error occurred' });
        }
    })
    .post((req, res) => {
        // Handle POST requests if needed
        res.status(405).json({ error: 'Method Not Allowed' });
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
