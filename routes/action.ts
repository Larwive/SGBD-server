import {app, client} from "../server";

export function route_action(){
    app.post('/action', async (req, res) => {
        const postData = req.body;
    

        console.log("action Postdata : \n", postData);
        const minDate = postData.postMinDate === undefined ? 'true' : `date_prise_en_charge >= TO_DATE('${postData.postMinDate}', 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        const action_id = postData.action_id === undefined ? 'true' : `id_action='${postData.action_id}'`;
        const action_title = postData.action_title === undefined ? 'true' : `intitule='${postData.action_title}'`;
        console.log(`Getting interventions betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT actions.*, SUM(duree) AS "duree totale" FROM actions NATURAL JOIN realiser NATURAL JOIN interventions WHERE ${minDate} AND ${maxDate} AND ${action_id} AND ${action_title} GROUP BY id_action;`);
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the actions table\'s data.', err);
            res.status(500).json({error: 'An error occurred while getting actions\' data.', err});
        }
    })
}

