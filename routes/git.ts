import * as crypto from "crypto"; //Auto GitHub update's security
import * as cmd from "node-cmd"; //Auto GitHub update
import {app} from "../server";

//Auto GitHub update
export function route_git(){
    app.post("/git", (req, res) => {
        let hmac!: crypto.Hmac;
        if (process.env.SECRET !== undefined) {
            hmac = crypto.createHmac("sha1", process.env.SECRET);
        }
        //let sig: string =
            //"sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");

        // If event is "push"
        if (
            req.headers["x-github-event"] === "push"// &&
            //sig === req.headers["x-hub-signature"]
        ) {
            console.log("Push incoming...");
            if (req.headers["x-github-event"] === "push") {
                cmd.run("chmod 777 git.sh", (err: any, data: string) => {
                    if (data) console.log(data);
                    if (err) console.log(err);
                }); /* :/ Fix no perms after updating */
                cmd.run("sleep 1 && ./git.sh", (err: any, data: string) => {
                    // Run our script
                    if (data) console.log(data);
                    if (err) console.log(err);
                    return res.status(500).json({ error: "Error running git.sh script." });
                });
                cmd.run("refresh", (err: any, data: string) => {
                    // Run our script
                    if (data) console.log(data);
                    if (err) console.log(err);
                }); // Refresh project
                let commits: string =
                    req.body.head_commit.message.split("\n").length === 1
                        ? req.body.head_commit.message
                        : req.body.head_commit.message
                            .split("\n")
                            .map((el: string, i: number): string =>
                                i !== 0 ? "                       " + el : el
                            )
                            .join("\n");
                console.log(
                    `> [GIT] Updated with origin/main\n         Latest commit: ${commits}`);
            }
        }
        return res.status(200).json({ success: "Webhook received successfully." });
});
}
