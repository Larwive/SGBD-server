import {app, client} from "../server";

export function route_listeModeleInterval(){
    app.post('/listeModeleInterval', async (req, res) => {
        const postData = req.body;
    

        console.log("listeModeleInterval POstdata : \n",postData);
        const minDate = postData.postMinDate === undefined ? 'true' : `date_prise_en_charge >= TO_DATE('${postData.postMinDate}', 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        console.log(`Getting listeModeleIntervals betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT DISTINCT modeles.* FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions WHERE ${maxDate} AND ${minDate};`
            );
            res.json({
                count: rowsQuery.rows.length,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the listeModeleInterval table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

