

//La liste des clients, avec le total des sommes facturées à chacun.
function sommesFacturees() {
    return "SELECT clients.*, SUM(montant) AS \"montant facturé\" FROM clients NATURAL JOIN factures GROUP BY id_client;"
}

//Liste des clients avec le nombre de véhicules qu’ils ont confiés au garage.
function nbVehiculesConfiees() {
    return "SELECT clients.*, COUNT(immatriculation) AS \"nombre de véhicules confiés\" FROM clients NATURAL JOIN vehicules GROUP BY id_client;";
}

