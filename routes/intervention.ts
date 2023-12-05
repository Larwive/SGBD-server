import {app, client} from "../server";

export function route_intervention(){
    app.post('/intervention', async (req, res) => {
        const postData = req.body;
    

        console.log("intervention POstdata : \n",postData);
        const minDate = postData.postMinDate === undefined ? 'true' : `date_prise_en_charge >= TO_DATE('${postData.postMinDate}', 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        const forename = postData.client_forename === undefined ? 'true' : `prenom_client='${postData.client_forename}'`;
        const surname = postData.client_surname === undefined ? 'true' : `nom_client='${postData.client_surname}'`;
        console.log(`Getting interventions betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT * FROM interventions NATURAL JOIN factures NATURAL JOIN clients WHERE ${minDate} AND ${maxDate} AND ${forename} AND ${surname};`);
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the interventions table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)', err});
        }
    })
}

