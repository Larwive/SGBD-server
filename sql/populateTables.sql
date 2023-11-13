--Constructeurs
INSERT INTO constructeurs(nom_constructeur) VALUES ('Renault');
INSERT INTO constructeurs(nom_constructeur) VALUES ('Toyota');

--Clients
INSERT INTO clients(nom_client, prenom_client, adresse_client, mail_client, telephone_client) VALUES ('Fensif', 'Ino', '1 rue Peyronnet', 'ino.fensif@cou.pable', '0666666666');
INSERT INTO clients(nom_client, prenom_client, adresse_client, mail_client, telephone_client) VALUES ('Trugernaner', 'Bernard', '18 rue Du Chateau Bègles', 'btrug@enseirb-matmeca.fr', '0720998517');

--Pieces
INSERT INTO pieces(nom_piece) VALUES ('Volant');
INSERT INTO pieces(nom_piece) VALUES ('2.5L Dynamic Force Engine');
INSERT INTO pieces(nom_piece) VALUES ('Plaquette de frein');
INSERT INTO pieces(nom_piece) VALUES ('Amortisseur');
INSERT INTO pieces(nom_piece) VALUES ('Autoradio');
INSERT INTO pieces(nom_piece) VALUES ('Pneu');
INSERT INTO pieces(nom_piece) VALUES ('Pare-brise');

--personnels
INSERT INTO personnels(nom_employe, prenom_employe, telephone_employe, poste) VALUES ('Bantam', 'Teemo', '6666666666', 'Mécanicien');

--Fabricants
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Sca', '2 rue des arnaques');
INSERT INTO fabricants(nom_fabricant, adresse_fabricant) VALUES ('Toyota', 'Aichi Japon');

--Actions
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Changer volant', 97, '47 minutes'::interval);
INSERT INTO actions(intitule, cout_action, duree) VALUES ('Réparer moteur', 180, '2 hours'::interval);

--Garages
INSERT INTO garages(nom_garage, adresse_garage) VALUES ('Le Ga Rage', '47 rue des accidents');
INSERT INTO garages(nom_garage, adresse_garage) VALUES ('Pimp my Ride', '2bis avenue du tuning');

--Modeles
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Xtrem 4x4', 'Traction', 1);
INSERT INTO modeles(nom_modele, type_motorisation, id_constructeur) VALUES ('Camry 2017', 'Hybride', 2);

--Vehicules
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('BA-567-TE', '2022-07-15', '16x16', 1, 1);
INSERT INTO vehicules(immatriculation, date_de_mise_en_circulation, type_vehicule, id_client, id_modele) VALUES ('XX-420-XX', '2019-08-10', 'SUV', 2, 2);

--Interventions
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-04-15', '2022-04-19', 45000, 'Controle technique', 'Terminé', 'Rappel', 1, 1);
INSERT INTO interventions(date_prise_en_charge, date_retour_prevue, kilometrage, type_intervention, etat_intervention, origine_intervention, id_vehicule, id_garage) VALUES ('2023-11-12', '2022-11-26', 20000, 'Reparation', 'Terminé', 'Urgence', 2, 1);

--Factures
INSERT INTO factures(montant, id_intervention, id_client) VALUES (100, 1, 1);
INSERT INTO factures(montant, id_intervention, id_client) VALUES (250, 2, 2);

--Contenir
INSERT INTO contenir(id_modele, id_piece) VALUES (1, 1);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 2);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 3);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 4);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 5);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 6);
INSERT INTO contenir(id_modele, id_piece) VALUES (2, 7);

--Fabriquer
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (1, 1, 45);
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (2, 2, 7500);
INSERT INTO fabriquer(id_piece, id_fabricant, cout_piece) VALUES (4, 2, 500);

--Realiser
INSERT INTO realiser(id_intervention, id_action) VALUES (1, 1);
INSERT INTO realiser(id_intervention, id_action) VALUES (2, 2);

--Remplacer
INSERT INTO remplacer(id_piece, id_intervention) VALUES (1, 1);

--Travailler
INSERT INTO travailler(id_intervention, id_employe) VALUES (2, 1);