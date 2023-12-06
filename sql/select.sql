--Ce fichier n'est pas utilisé. Il contient en revanche des versions non paramétrées des requêtes utilisées.

--La liste des clients, avec le total des sommes facturées à chacun.
SELECT clients.*, SUM(montant) AS "montant facturé" FROM clients NATURAL JOIN factures GROUP BY id_client;

--Liste des clients avec le nombre de véhicules qu’ils ont confiés au garage.
SELECT clients.*, COUNT(immatriculation) AS "nombre de véhicules confiés" FROM clients NATURAL JOIN vehicules GROUP BY id_client;

--La liste des clients, avec le total des sommes facturées à chacun.
SELECT clients.*, SUM(montant) AS "montant facturé" FROM clients NATURAL JOIN factures GROUP BY id_client;

--Liste des clients avec le nombre de véhicules qu’ils ont confiés au garage.
SELECT clients.*, COUNT(immatriculation) AS "nombre de véhicules confiés" FROM clients NATURAL JOIN vehicules GROUP BY id_client;

--Liste des interventions prévues dans les deux prochains mois.
SELECT * FROM interventions WHERE date_prise_en_charge >= CURRENT_DATE AND date_prise_en_charge <= CURRENT_DATE + INTERVAL '2 months';

--Liste des modèle avec le type d'intervention le plus fréquemment réalisé sur chacun des modèles.
SELECT DISTINCT ON (id_modele) id_modele, type_intervention, COUNT(type_intervention) AS intervention_count FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions GROUP BY id_modele, type_intervention ORDER BY id_modele, intervention_count DESC;

--Liste des modèles pris en charge il y a moins d'un an.
SELECT DISTINCT modeles.* FROM modeles NATURAL JOIN vehicules NATURAL JOIN interventions WHERE date_prise_en_charge <= CURRENT_DATE AND date_prise_en_charge >= CURRENT_DATE - INTERVAL '1 year';

--Nombre d'heures facturées par mois.
SELECT TO_CHAR(EXTRACT(YEAR FROM date_facture), '9999')::integer "année", TO_CHAR(EXTRACT(MONTH FROM date_facture), '99')::integer "mois", sum(duree) "heures facturées" FROM actions NATURAL JOIN realiser NATURAL JOIN interventions NATURAL JOIN factures GROUP BY EXTRACT(YEAR FROM date_facture), EXTRACT(MONTH FROM date_facture) ORDER BY "année", "mois";
