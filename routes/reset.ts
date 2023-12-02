import {app, client} from "../server";
import {readFileSync} from 'fs'
    ;
import {checkRights} from "../account";
export function reset_tables(){
    app.post("/users", async (req : any, res : any): Promise<void> => {
        const postData = req.body;
        if (postData.id===undefined || postData.password===undefined) {
            throw new Error("Pas authentifié. Un compte admin est nécessaire.");
        }
        if (checkRights(postData.id, postData.password)!==2) {
            throw new Error("Pas les droits/mauvais nom d'utilisateur ou mot de passe.");
        }
        try {
            await client.query(readFileSync("../sql/createTables.sql",'utf8'));
            await client.query(readFileSync("../sql/populateTables.sql",'utf8'));
            res.status(200).json({success: 'Tables réinitialisées.'});
        } catch (err) {
            console.error("Error :", err);
            res.status(500).json({error: 'An error occurred (reset)'});
        }
    });
}
