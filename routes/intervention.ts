import {app, client} from "../server";

export function route_intervention(){
    app.post('/intervention', async (req, res) => {
        const postData = req.body;
    
        console.log(`Getting interventions betweens ${postData.postMinDate} and ${postData.postMaxDate}.\n`);
        const minDate = postData.postMinDate === null ? 'true' : `date_prise_en_charge >= TO_DATE(${postData.postMinDate}, 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === null ? 'true' : `date_prise_en_charge <= TO_DATE(${postData.postMaxDate}, 'DD/MM/YYYY')`;
        try {
            const countQuery = await client.query(`SELECT COUNT(*) FROM interventions WHERE ${minDate} AND ${maxDate};`);
            const rowsQuery = await client.query(`SELECT * FROM interventions WHERE ${minDate} AND ${maxDate};`);
            res.json({
                count: countQuery.rows[0].count,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the interventions table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

