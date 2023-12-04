import {app, client} from "../server";


// Every interventions scheduled between CURRENT_DATE and infinity
// Parameters : -postMaxDate >> Maximum date limit
//                  usage : "postMaxDate" : "01/10/2023"
export function route_nextInterventions(){
    app.post('/nextInterventions', async (req, res) => {
        const postData = req.body;
    

        console.log("nextInterventions POstdata : \n",postData);
        const minDate = 'date_prise_en_charge >= CURRENT_DATE';
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        console.log(`Getting nextInterventions betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT * FROM interventions WHERE ${minDate} AND ${maxDate};`);
            res.json({
                count: rowsQuery.rows.length,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the nextInterventionss table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

