const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const postgres = require('postgres');
const { Client } = require("pg");
require('dotenv').config();

const cmd = require("node-cmd"); //Auto github update

const corsOptions = {
    origin: '*', //'https://larwive.github.io',
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());


// Database connection
const client = new Client({
    user: "fyqtkvlq",
    host: "flora.db.elephantsql.com",
    database: "fyqtkvlq",
    password: "toDYnbZmOfBhVKB7RRE1QUlxzr7I3aBz",
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

// Handle both GET and POST requests
app.route('/api/data')
    .get(async (req, res) => {
        console.log("Here (GET).\n");
        try {
            const result = await client.query(
                "SELECT $1::text as message", [
                    "Hello world from node.js server with git pull integration! Teemo. Ça doit piquer.",
                ])
            ;
            res.json(result);
        } catch (err) {
            console.error('Error executing query (GET).', err);
            res.status(500).json({ error: 'An error occurred (GET).' });
        }
    })
    .post(async (req, res) => {

        const postData = req.body;

        console.log(`${postData.queryType} ${postData.fetching} ${postData.table};\n`);

        try {
            const result = await client.query(`${postData.queryType} ${postData.fetching} ${postData.table};`);
            res.json(result);
        } catch (err) {
            console.error('Error executing query (POST)', err);
            res.status(500).json({ error: 'An error occurred (POST)' });
        }
    });

//Auto github update
app.post('/git', (req, res) => {
    // If event is "push"
    if (req.headers['x-github-event'] === "push") {
        if (req.headers['x-github-event'] === "push") {
            cmd.run('chmod 777 git.sh'); /* :/ Fix no perms after updating */
            cmd.get('sleep 1 && ./git.sh', (err, data) => {  // Run our script
                if (data) console.log(data);
                if (err) console.log(err);
            });
            cmd.run('refresh');  // Refresh project

            console.log("> [GIT] Updated with origin/master");
        }
    }})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
