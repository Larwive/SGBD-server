import { app, client } from "../server";

export function get_table() {
    app.post("/gettable", async (req: any, res: any): Promise<void> => {
        const postData = req.body;
        try {
            const rowsQuery = await client.query(`SELECT * FROM ${postData.table};`);
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows,
            });
        } catch (err) {
            console.error(`Erreur d'obtention des données de ${postData.table}.`, err);
        }
    });
}
