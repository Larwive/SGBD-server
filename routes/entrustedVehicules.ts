import {app, client} from "../server";


// Gives for each clients, its data + the count of vehicule(s) that they entrusted us with
// Parameters : -postName >> Filter by client names. Case sensitive
//                  usage : "postName" : "Kevin"
//            : -postSurname >> Filter by client surnames. Case sensitive
//                  usage : "postSurname" : "DeLaFontaine"
export function route_entrustedVehicules(){
    app.post('/entrustedVehicules', async (req, res) => {
        const postData = req.body;

        console.log("entrustedVehicules POstdata : \n",postData);
        const name = postData.prenom_client === undefined ? 'true' : `prenom_client = '${postData.prenom_client}'`;
        const surname = postData.nom_client === undefined ? 'true' : `nom_client = '${postData.nom_client}'`;
        console.log(`Getting entrustedVehicules for client ${name} and ${surname}.\n`);
        try {
            const rowsQuery = await client.query(`SELECT clients.*, COUNT(immatriculation) AS \"nombre de véhicules confiés\" FROM clients NATURAL JOIN vehicules WHERE ${name} AND ${surname} GROUP BY id_client;`
            );
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the entrustedVehicules table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

