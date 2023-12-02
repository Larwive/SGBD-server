import {app, client} from "../server";

export function route_users(){
    app.post("/users", async (req : any, res : any): Promise<void> => {
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
}
