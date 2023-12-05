import {app, client} from "../server";


// Lists each car models ids along with the most frequent intervention performed on it and its count
export function route_frequentInterventionOnModels(){
    app.post('/frequentInterventionOnModels', async (req, res) => {
        try {
            const rowsQuery = await client.query(`SELECT DISTINCT ON (id_modele) id_modele, type_intervention, COUNT(type_intervention) AS intervention_count FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions GROUP BY id_modele, type_intervention ORDER BY id_modele, intervention_count DESC;;`
            );
            res.json({
                count: rowsQuery.rowCount,
                rows: rowsQuery.rows
            });
        } catch (err) {
            console.error('Error getting the frequentInterventionOnModels table\'s data.', err);
            res.status(500).json({error: 'An error occurred (POST)'});
        }
    })
}

