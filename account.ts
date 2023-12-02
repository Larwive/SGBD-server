export let admin = new Map<string, string>();
export let employe = new Map<string, string>();

admin.set("Teemo", "Bantam");
admin.set("admin", "admin");

employe.set("Sergio", "Delafenetre");
employe.set("Fenetre", "Delasergio");


export function checkRights(id:string, password:string):number {
    if (id in admin.keys() && admin.get(id)===password) {
        return 2;
    }
    if (id in employe.keys() && employe.get(id)===password) {
        return 1;
    }
    return 0;
}