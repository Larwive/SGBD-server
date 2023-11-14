--Constructeurs
INSERT INTO constructeurs(nom_constructeur) VALUES ('Renault');
INSERT INTO constructeurs(nom_constructeur) VALUES ('Toyota');
INSERT INTO constructeurs(nom_constructeur) VALUES ('Peugeot');
INSERT INTO constructeurs(nom_constructeur) VALUES ('Citroën');
INSERT INTO constructeurs(nom_constructeur) VALUES ('Tesla');

--Clients
INSERT INTO clients(nom_client, prenom_client, adresse_client, mail_client, telephone_client) VALUES ('Fensif', 'Ino', '1 rue Peyronnet', 'ino.fensif@cou.pable', '0666666666');
INSERT INTO clients(nom_client, prenom_client, adresse_client, mail_client, telephone_client) VALUES ('Peyrondet', 'Louis', '6 rue François Boucherie Bègles', 'lpeyrondet@enseirb-matmeca.fr', '0782632346');
INSERT INTO clients(nom_client, prenom_client, adresse_client, mail_client, telephone_client) VALUES ('Musk', 'Elon', '3500 Deer Creek Road Palo Alto, CA 94304 United States', 'jesuiselonmusk@tesla.com', '0988981745');

--Pieces
INSERT INTO pieces(nom_piece) VALUES ('Volant');
INSERT INTO pieces(nom_piece) VALUES ('Moteur hybride');
INSERT INTO pieces(nom_piece) VALUES ('Plaquette de frein');
INSERT INTO pieces(nom_piece) VALUES ('Amortisseur');
INSERT INTO pieces(nom_piece) VALUES ('Autoradio');
INSERT INTO pieces(nom_piece) VALUES ('Pneu');
INSERT INTO pieces(nom_piece) VALUES ('Pare-brise');
INSERT INTO pieces(nom_piece) VALUES ('Moteur thermique');
INSERT INTO pieces(nom_piece) VALUES ('Moteur electrique');
INSERT INTO pieces(nom_piece) VALUES ('Huile');
INSERT INTO pieces(nom_piece) VALUES ('Carrosserie');


--personnels
INSERT INTO personnels(nom_employe, prenom_employe, telephone_employe, poste) VALUES ('Bantam', 'Teemo', '6666666666', 'Mécanicien');
INSERT INTO personnels(nom_employe, prenom_employe, telephone_employe, poste) VALUES ('Bantam', 'Teemo', '6666666666', 'Mécanicien');
INSERT INTO personnels(nom_employe, prenom_employe, telephone_employe, poste) VALUES ('Alvien', 'Nathaniel Joiner', '0712100875', 'Carrossier');

--Fabricants
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Sca', '2 rue des arnaques');
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Toyota', 'Aichi Japon');
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Peugeot', 'Paris');
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Citroën', '2-10 2 bouevard de l europe 78300 POISSY');
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Tesla', 'Ausin Texas Etats-Unis');

--Actions
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer volant', 97, '47 minutes'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Réparer moteur', 750, '2 hours'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer carrosserie', 1500, '4 hours'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer Pneu', 250, '2 hours'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer Pare-brise', 200, '90 minutes'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer huile', 150, '45 minutes'::interval);

--Garages
INSERT INTO garages(nom_garage, adresse_garage) VALUES ('Le Ga Rage', '47 rue des accidents');
INSERT INTO garages(nom_garage, adresse_garage) VALUES ('Pimp my Ride', '2bis avenue du tuning');

--Modeles
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Xtrem 4x4', 'Traction', 1);
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Camry 2017', 'Hybride', 2);
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Peugeot 208', 'Thermique', 3);
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Citroën C3', 'Thermique', 4);
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Model Y', 'Electrique', 5);

--Vehicules
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('BA-567-TE', '2022-07-15', '16x16', 1, 1);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('XX-420-XX', '2019-08-10', 'SUV', 2, 2);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('J1-TM-IB7', '2022-05-08', 'Citadine', 2, 4);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('789-RPZ-LP', '2023-01-26', 'Berline', 2, 3);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('YO-69-BOY', '2022-04-26', 'SUV', 3, 5);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('ELONMAH-69', '2020-11-12', 'SUV', 3, 5);

--Interventions
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-04-15', '2022-04-19', 45000, 'Controle technique', 'Terminé', 'Rappel', 1, 1);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-11-12', '2022-11-26', 20000, 'Reparation', 'Terminé', 'Urgence', 2, 1);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-08-25', '2023-08-31', 14000, 'Controle technique', 'Termine', 'Rappel', 3, 1);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-12-20', '2024-01-04', 25000, 'Reparation', 'Termine', 'Urgence', 4, 2);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2021-11-30', '2021-12-05', 7000, 'Controle technique', 'Terminé', 'Rappel', 6, 2);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-06-22', '2023-06-27', 15000, 'Controle technique', 'Terminé', 'Rappel', 5, 2);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-08-15', '2023-08-18', 16500, 'Reparation', 'Terminé', 'Urgence', 5, 2);

--Factures
INSERT INTO factures(montant, id_intervention, id_client) VALUES (100, 1, 1);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 2, 2);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 3, 2);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 4, 2);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 5, 3);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 6, 3);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 7, 3);


--Contenir
INSERT INTO contenir(id_modele, id_piece) VALUES (1, 1);

INSERT INTO contenir(id_modele, id_piece) VALUES (2, 2);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 7);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 10);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 11);

INSERT INTO contenir(id_modele, id_piece) VALUES (3, 8);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 7);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 10);
INSERT INTO contenir(id_modele, id_piece) VALUES (3, 11);

INSERT INTO contenir(id_modele, id_piece) VALUES (4, 8);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 7);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 10);
INSERT INTO contenir(id_modele, id_piece) VALUES (4, 11);

INSERT INTO contenir(id_modele, id_piece) VALUES (5, 9);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 7);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 10);
INSERT INTO contenir(id_modele, id_piece) VALUES (5, 11);

INSERT INTO contenir(id_modele, id_piece) VALUES (6, 9);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 7);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 10);
INSERT INTO contenir(id_modele, id_piece) VALUES (6, 11);

--Fabriquer
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (1, 1, 45);
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (2, 2, 7500);
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (4, 2, 500);

--Realiser
INSERT INTO realiser(id_intervention, id_action) VALUES (1, 1);
INSERT INTO realiser(id_intervention, id_action) VALUES (2, 2);
INSERT INTO realiser(id_intervention, id_action) VALUES (3, 6);
INSERT INTO realiser(id_intervention, id_action) VALUES (4, 3);
INSERT INTO realiser(id_intervention, id_action) VALUES (5, 6);
INSERT INTO realiser(id_intervention, id_action) VALUES (6, 6);
INSERT INTO realiser(id_intervention, id_action) VALUES (7, 5);

--Remplacer
INSERT INTO remplacer(id_piece, id_intervention) VALUES (1, 1);
INSERT INTO remplacer(id_piece, id_intervention) VALUES (10, 3);
INSERT INTO remplacer(id_piece, id_intervention) VALUES (10, 5);
INSERT INTO remplacer(id_piece, id_intervention) VALUES (10, 6);
INSERT INTO remplacer(id_piece, id_intervention) VALUES (7, 7);
INSERT INTO remplacer(id_piece, id_intervention) VALUES (11, 4);

--Travailler
INSERT INTO travailler(id_intervention, id_employe) VALUES (2, 2);
INSERT INTO travailler(id_intervention, id_employe) VALUES (3, 1);
INSERT INTO travailler(id_intervention, id_employe) VALUES (4, 2);
INSERT INTO travailler(id_intervention, id_employe) VALUES (5, 2);
INSERT INTO travailler(id_intervention, id_employe) VALUES (6, 2);
INSERT INTO travailler(id_intervention, id_employe) VALUES (7, 2);
