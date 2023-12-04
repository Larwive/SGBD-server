import {app, client} from "../server";


// Every months along with the hours + minutes charged for it  
// Parameters : -postMaxDate >> Maximum date limit
//                  usage : "postMaxDate" : "01/10/2023"
//            : -postMinDate >> Minimum date limit 
//                  usage : "postMinDate" : "8/4/2022"
export function route_nbChargedHours(){
    app.post('/nbChargedHours', async (req, res) => {
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
            console.error('Error getting the nbChargedHours table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

