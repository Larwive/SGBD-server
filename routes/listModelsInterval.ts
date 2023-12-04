import {app, client} from "../server";


// Every car models that has been worked on
// Parameters : -postMaxDate >> Maximum date limit
//                  usage : "postMaxDate" : "01/10/2023"
//            : -postMinDate >> Minimum date limit 
//                  usage : "postMinDate" : "8/4/2022"
export function route_listModelsInterval(){
    app.post('/listModelsInterval', async (req, res) => {
        const postData = req.body;
    

        console.log("listModelsInterval POstdata : \n",postData);
        const minDate = postData.postMinDate === undefined ? 'true' : `date_prise_en_charge >= TO_DATE('${postData.postMinDate}', 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        console.log(`Getting listModelsInterval betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT DISTINCT modeles.* FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions WHERE ${maxDate} AND ${minDate};`
            );
            res.json({
                count: rowsQuery.rows.length,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the listModelsInterval table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

