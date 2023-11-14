const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
//const postgres = require('postgres');
const {Client} = require("pg");
require('dotenv').config();

const cmd = require("node-cmd"); //Auto github update
const crypto = require("crypto"); //Auto github update's security
const corsOptions = {
    origin: ['https://larwive.github.io', 'https://api.github.com', 'http://localhost:3000'], // Reminder : enlever localhost:*
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());


// Database connection
const client = new Client({
    user: `${process.env.USER}`,
    host: `${process.env.HOST}`,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`,
    //port: process.env.PORT,
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database.');
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
                    "Hello world from node.js server !",
                ])
            ;
            res.json(result);
        } catch (err) {
            console.error('Error executing query (GET).', err);
            res.status(500).json({error: 'An error occurred (GET).'});
        }
    })
    .post(async (req, res) => {

        const postData = req.body;

        console.log(`${postData.queryType} ${postData.fetching} ${postData.table};\n`);

        try {
            console.log("Sending query...")
            const result = await client.query(`${postData.queryType} ${postData.fetching} ${postData.table};`);
            console.log("Successfull query.")
            res.json(result);
            console.log("Result sent.")
        } catch (err) {
            console.error('Error executing query (POST) ', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    });

//Auto github update
app.post('/git', (req, res) => {
    let hmac = crypto.createHmac("sha1", process.env.SECRET);
    let sig = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");

    // If event is "push"
    if (req.headers['x-github-event'] === "push" && sig === req.headers['x-hub-signature']) {
        console.log("Push incoming...");
        if (req.headers['x-github-event'] === "push") {
            cmd.run('chmod 777 git.sh'); /* :/ Fix no perms after updating */
            cmd.run('sleep 1 && ./git.sh', (err, data) => {  // Run our script
                if (data) console.log(data);
                if (err) console.log(err);
                return res.status(500).json({error: 'Error running git.sh script.'});
            });
            cmd.run('refresh');  // Refresh project
            let commits = req.body.head_commit.message.split("\n").length === 1 ?
                req.body.head_commit.message :
                req.body.head_commit.message.split("\n").map((el, i) => i !== 0 ? "                       " + el : el).join("\n");
            console.log(`> [GIT] Updated with origin/main\n ` +
                `        Latest commit: ${commits}`);
        }
    }
    return res.status(200).json({success: 'Webhook received successfully.'});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
