import { app, client } from "../server";

export function get_table() {
    app.post("/users", async (req: any, res: any): Promise<void> => {
        const postData = req.body;
        try {
            const countQuery = await client.query(`SELECT COUNT(*) FROM ${postData.table};`);
            const rowsQuery = await client.query(`SELECT * FROM ${postData.table};`);
            res.json({
                count: countQuery.rows[0].count,
                rows: rowsQuery.rows,
            });
        } catch (err) {
            console.error(`Erreur d'obtention des données de ${postData.table}.`, err);
        }
    });
}
