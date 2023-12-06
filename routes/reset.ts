import {app, client} from "../server";
import {readFileSync} from 'fs';
import {checkRights} from "../account";

export function reset_tables(){
    app.post("/reset", async (req : any, res : any): Promise<void> => {
        const postData = req.body;

        if (checkRights(postData)!==2) {
            console.log("Pas les droits/mauvais nom d'utilisateur ou mot de passe.");
            return res.status(500).json({error: "Pas les droits/mauvais nom d'utilisateur ou mot de passe."});
        }
        try {
            await client.query(readFileSync("./sql/drop.sql",'utf8'));
            await client.query(readFileSync("./sql/create.sql",'utf8'));
            await client.query(readFileSync("./sql/insert.sql",'utf8'));
            res.status(200).json({success: 'Tables réinitialisées.'});
        } catch (err) {
            console.error("Error :", err);
            res.status(500).json({error: 'An error occurred (reset)'});
        }
    });
}
