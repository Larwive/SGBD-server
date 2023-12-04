export let admin = new Map<string, string>();
export let employe = new Map<string, string>();

admin.set("Teemo", "Bantam");
admin.set("admin", "admin");

employe.set("Sergio", "Delafenetre");
employe.set("Fenetre", "Delasergio");


function getRights(id:string, password:string):number {
    if (admin.has(id) && admin.get(id)===password) {
        return 2;
    }
    if (employe.has(id) && employe.get(id)===password) {
        return 1;
    }
    return 0;
}

export function checkRights(body:any):number {
    if (body.id===undefined || body.password===undefined) {
        console.log("Pas authentifié. Un compte admin est nécessaire.");
        return 0;
    }
    return getRights(body.id, body.password);
}