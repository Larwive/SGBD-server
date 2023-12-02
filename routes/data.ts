import {app, client} from "../server";

// Handle both GET and POST requests for /api/data
export function route_data(){
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
}