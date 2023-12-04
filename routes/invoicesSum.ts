import {app, client} from "../server";


// Gives for each clients, ist data and the sum of all its invoices
// Parameters : -postName >> Filter by client names. Case sensitive
//                  usage : "postName" : "Kevin"
//            : -postSurname >> Filter by client surnames. Case sensitive
//                  usage : "postSurname" : "DeLaFontaine"
export function route_invoicesSum(){
    app.post('/invoicesSum', async (req, res) => {
        const postData = req.body;

        console.log("invoicesSum POstdata : \n",postData);
        const name = postData.postName === undefined ? 'true' : `prenom_client = '${postData.postName}'`;
        const surname = postData.postSurname === undefined ? 'true' : `nom_client = '${postData.postSurname}'`;
        console.log(`Getting invoicesSum for client ${name} and ${surname}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT clients.*, SUM(montant) AS \"montant facturé\" FROM clients NATURAL JOIN factures WHERE ${name} AND ${surname} GROUP BY id_client;`
            );
            res.json({
                count: rowsQuery.rows.length,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the invoicesSum table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

