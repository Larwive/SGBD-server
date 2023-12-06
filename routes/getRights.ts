import {app, client} from "../server";
import {checkRights} from "../account";

export function getRights(){
    app.post(`/getrights`, async (req, res) => {
        const postData = req.body;

        try {
            res.json({
                rights: checkRights(postData)
            });
            //res.status(200).json({success: `Permissions obtenues.`});
        } catch (err) {
            console.error("Error :", err);
            res.status(500).json({error: `Une erreur est survenue lors de l'obtention des permissions.`, err});
        }
    })
}