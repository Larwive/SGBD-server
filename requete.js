

//La liste des clients, avec le total des sommes facturées à chacun.
function sommesFacturees() {
    return "SELECT clients.*, SUM(montant) AS \"montant facturé\" FROM clients NATURAL JOIN factures GROUP BY id_client;"
}

//Liste des clients avec le nombre de véhicules qu’ils ont confiés au garage.
function nbVehiculesConfiees() {
    return "SELECT clients.*, COUNT(immatriculation) AS \"nombre de véhicules confiés\" FROM clients NATURAL JOIN vehicules GROUP BY id_client;";
}

//Liste des interventions prévues dans les deux prochains mois.
function listInterventionsDeuxMois() {
    return "SELECT * FROM interventions WHERE date_prise_en_charge >= CURRENT_DATE AND date_prise_en_charge <= CURRENT_DATE + INTERVAL '2 months';\n"
}

//Liste des modèle avec le type d'intervention le plus fréquemment réalisé sur chacun des modèles.
function interventionsModelesFrequents() {
    return "SELECT DISTINCT ON (id_modele) id_modele, type_intervention, COUNT(type_intervention) AS intervention_count FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions GROUP BY id_modele, type_intervention ORDER BY id_modele, intervention_count DESC;;\n"
}

//Liste des modèles pris en charge il y a moins d'un an.
function listeModeleAnneeEcoulee() {
    return "SELECT DISTINCT modeles.* FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions WHERE date_prise_en_charge <= CURRENT_DATE AND date_prise_en_charge >= CURRENT_DATE - INTERVAL '1 year';\n"
}

//Nombre d'heures facturées par mois.
// function nbHeuresFacturees() {
//     return "SELECT TO_CHAR(EXTRACT(YEAR FROM date_facture), '9999')::integer \"année\", TO_CHAR(EXTRACT(MONTH FROM date_facture), '99')::integer \"mois\", sum(duree) \"heures facturées\" FROM actions NATURAL JOIN realiser NATURAL JOIN interventions NATURAL JOIN factures GROUP BY EXTRACT(YEAR FROM date_facture), EXTRACT(MONTH FROM date_facture) ORDER BY \"année\", \"mois\";"
// }
