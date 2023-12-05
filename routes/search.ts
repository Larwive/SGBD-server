import {app, client} from "../server";
import {tables_champs} from "./insertion";


//A route to filter a certain table with some of its attributes.
export function route_search(){
    app.post('/search', async (req, res) => {
        const postData = req.body;

        const table_name = postData.table;
        if (table_name === undefined)
            return res.status(500).json({error: 'You need to provide a table name.',});
        let wheres = "WHERE true";
        let fields_names:Array<string>=[];

        if (!(tables_champs.has(table_name) ||  tables_champs3.has(table_name))) //Check if the table name provided is correct.
            return res.status(500).json({error: `The table ${table_name} doesn't exist. t`});


        if (tables_champs.has(table_name))
            { // @ts-ignore
                fields_names = tables_champs.get(table_name);
            }
        else {
            // @ts-ignore
            fields_names = tables_champs3.get(table_name).flat();
        }

        if (fields_names.length===0)
            return res.status(500).json({error: `The table ${table_name} doesn't exist.`});

        for (const key in postData) {
            const value = postData[key];
            if (fields_names.includes(key)) {
                wheres = wheres.concat(` AND ${key}='${value}'`);
            }
        }

        console.log(wheres);
        try {
            const rowsQuery = await client.query(`SELECT * FROM ${table_name} ${wheres};`);
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error(`Error getting the ${table_name} table's data.`, err);
            res.status(500).json({error: 'An error occurred while getting ${table_name}\' data.', err});
        }
    })
}

export let tables_champs3 = new Map<string, string[]>();
// @ts-ignore
tables_champs3.set("contenir", ["id_piece", "id_modele"]);
// @ts-ignore
tables_champs3.set("fabriquer", ["id_piece", "id_fabricant", "cout_piece"]);
// @ts-ignore
tables_champs3.set("realiser", ["id_action", "id_intervention"]);
// @ts-ignore
tables_champs3.set("remplacer", ["id_piece", "id_intervention"]);
// @ts-ignore
tables_champs3.set("travailler", ["id_employe", "id_intervention"]);
