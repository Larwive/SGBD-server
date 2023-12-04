import {app, client} from "../server";

export function route_nbHeuresFacturees(){
    app.post('/nbHeuresFacturees', async (req, res) => {
        const postData = req.body;
    
        console.log("NbHeureFacturees POstdata : \n",postData);
        const minDate = postData.postMinDate === undefined ? 'true' : `date_prise_en_charge >= TO_DATE('${postData.postMinDate}', 'DD/MM/YYYY')`;
        const maxDate = postData.postMaxDate === undefined ? 'true' : `date_prise_en_charge <= TO_DATE('${postData.postMaxDate}', 'DD/MM/YYYY')`;
        console.log(`Getting interventions betweens ${minDate} and ${maxDate}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT TO_CHAR(EXTRACT(YEAR FROM date_facture), '9999')::integer \"année\", TO_CHAR(EXTRACT(MONTH FROM date_facture), '99')::integer \"mois\", sum(duree) \"heures facturées\" FROM actions NATURAL JOIN realiser NATURAL JOIN interventions NATURAL JOIN factures WHERE ${minDate} AND ${maxDate} GROUP BY EXTRACT(YEAR FROM date_facture), EXTRACT(MONTH FROM date_facture) ORDER BY \"année\", \"mois\";`);
            res.json({
                count: rowsQuery.rows.length,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the nbHeuresFacturees table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

