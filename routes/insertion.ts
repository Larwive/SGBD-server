import {app, client} from "../server";
import {checkRights} from "../account";

export function create_insert_routes(table_name: string, fields: string[]){
    app.post(`/insertion/${table_name}`, async (req, res) => {
        const postData = req.body;

        if (checkRights(postData)<2) {
            console.log("Pas les droits/mauvais nom d'utilisateur ou mot de passe.");
            return res.status(500).json({error: "Pas les droits/mauvais nom d'utilisateur ou mot de passe."});
        }

        if (fields.some((x) => !(x in postData))) { //Si des attributs ne sont pas dans postData
            const types = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${table_name}';`)).rows.slice(1).map((row)=>{const { column_name, data_type } = row; return `${column_name}: ${data_type}`}).join(", ");
            return res.status(500).json({error: 'Champ(s) invalides. Attendu(s) : '+types});
        }

        try {
            const data = fields.map((field)=>(typeof postData[field] === 'string' ? `'${ postData[field]}'` : postData[field])).join(", ");
            await client.query(`INSERT INTO ${table_name}(${fields.join(', ')}) VALUES (${data});`);
            res.status(200).json({success: `Données insérées dans la table ${table_name}: ${data}`});
        } catch (err) {
            console.error("Error :", err);
            const types = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${table_name}';`)).rows.slice(1).map((row)=>{const { column_name, data_type } = row; return `${column_name}: ${data_type}`}).join(", ");
            res.status(500).json({error: `Une erreur est survenue lors de l'insertion dans ${table_name}: ${types}`, err});
        }
    })
}

export function create_insert_routes2(table_names:string[], fields:string[][]){
    app.post(`/insertion/${table_names[0]}`, async (req, res) => {
        const postData = req.body;

        if (checkRights(postData)<2) {
            console.log("Pas les droits/mauvais nom d'utilisateur ou mot de passe.");
            return res.status(500).json({error: "Pas les droits/mauvais nom d'utilisateur ou mot de passe."});
        }

        if (fields[0].slice(2).some((x) => !(x in postData)) || fields[1].some((x) => !(x in postData)) || fields[2].some((x) => !(x in postData))) {
            const types0 = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${table_names[0]}';`)).rows.slice(2).map((row)=>{const { column_name, data_type } = row; return `${column_name}: ${data_type}`}).join(", ");
            const types1 = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${table_names[1]}';`)).rows.slice(1).map((row)=>{const { column_name, data_type } = row; return `${column_name}: ${data_type}`}).join(", ");
            const types2 = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${table_names[2]}';`)).rows.slice(1).map((row)=>{const { column_name, data_type } = row; return `${column_name}: ${data_type}`}).join(", ");
            return res.status(500).json({error: `Champ(s) invalides. Attendu(s) : ${types0}, ${types1}, ${types2}`});
        }

        const keys = fields[0].slice(0, 2);
        try {
            const key1:number = (await client.query(`INSERT INTO ${table_names[1]}(${fields[1].join(', ')}) VALUES (${fields[1].map((field)=>(typeof postData[field] === 'string' ? `'${postData[field]}'` : postData[field])).join(", ") }) RETURNING ${keys[0]};`)).rows[0][keys[0]];
            const key2:number = (await client.query(`INSERT INTO ${table_names[2]}(${fields[2].join(', ')}) VALUES (${fields[2].map((field)=>(typeof postData[field] === 'string' ? `'${postData[field]}'` : postData[field])).join(", ") }) RETURNING ${keys[1]};`)).rows[0][keys[1]];

            let values="";
            if (fields[0].length>2)
                values = ` , ${fields[0].slice(2).map((field)=>(typeof postData[field] === 'string' ? `'${postData[field]}'` : postData[field])).join(", ") }`;

            await client.query(`INSERT INTO ${table_names[0]}(${fields[0].join(', ')}) VALUES (${key1}, ${key2}${values});`);
            res.status(200).json({success: `Données insérées dans les tables ${table_names.join(", ")}.`});
        } catch (err) {
            console.error("Error :", err);
            res.status(500).json({error: `Une erreur est survenue lors de l'insertion dans ${table_names.join(", ")}`, err});
        }
    })
}

export let tables_champs = new Map<string, string[]>();
tables_champs.set("constructeurs", ["nom_constructeur"]);
tables_champs.set("clients", ["nom_client", "prenom_client", "adresse_client", "mail_client", "telephone_client"]);
tables_champs.set("pieces", ["nom_piece"]);
tables_champs.set("personnels", ["nom_employe", "prenom_employe", "telephone_employe", "poste"]);
tables_champs.set("fabricants", ["nom_fabricant", "adresse_fabricant"]);
tables_champs.set("actions", ["intitule", "cout_action", "duree"]);
tables_champs.set("garages", ["nom_garage", "adresse_garage"]);
tables_champs.set("modeles", ["nom_modele", "type_motorisation", "id_constructeur"]);
tables_champs.set("vehicules", ["immatriculation", "date_de_mise_en_circulation", "type_vehicule", "id_client", "id_modele"]);
tables_champs.set("interventions", ["date_prise_en_charge", "date_retour_prevue", "kilometrage", "type_intervention", "etat_intervention", "origine_intervention", "id_vehicule", "id_garage"]);
tables_champs.set("factures", ["montant", "id_intervention", "id_client", "date_facture"]);

export let tables_champs2 = new Map<string[], string[][]>();
// @ts-ignore
tables_champs2.set(["contenir", "pieces", "modeles"], [["id_piece", "id_modele"], tables_champs.get("pieces"), tables_champs.get("modeles")]);
// @ts-ignore
tables_champs2.set(["fabriquer", "pieces", "fabricants"], [["id_piece", "id_fabricant", "cout_piece"], tables_champs.get("pieces"), tables_champs.get("fabricants")]);
// @ts-ignore
tables_champs2.set(["realiser", "actions", "interventions"], [["id_action", "id_intervention"], tables_champs.get("actions"), tables_champs.get("interventions")]);
// @ts-ignore
tables_champs2.set(["remplacer", "pieces", "interventions"], [["id_piece", "id_intervention"], tables_champs.get("pieces"), tables_champs.get("interventions")]);
// @ts-ignore
tables_champs2.set(["travailler", "personnels", "interventions"], [["id_employe", "id_intervention"], tables_champs.get("personnels"), tables_champs.get("interventions")]);
