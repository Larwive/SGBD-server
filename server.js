const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const postgres = require('postgres');
require('dotenv').config();

const corsOptions = {
    origin: 'https://larwive.github.io',
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

async function getPgVersion() {
    try {
        const result = await sql`select version()`;
        console.log(result);
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
}

getPgVersion();

// Updated route to handle both GET and POST requests
app.route('/api/data')
    .get(async (req, res) => {
        try {
            const result = await sql`SELECT * FROM your_table`;
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
