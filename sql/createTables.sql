DROP TABLE IF EXISTS "travailler";
DROP TABLE IF EXISTS "remplacer";
DROP TABLE IF EXISTS "realiser";
DROP TABLE IF EXISTS "fabriquer";
DROP TABLE IF EXISTS "contenir";
DROP TABLE IF EXISTS "factures";
DROP TABLE IF EXISTS "interventions";
DROP TABLE IF EXISTS "vehicules";
DROP TABLE IF EXISTS "modeles";
DROP TABLE IF EXISTS "garages";
DROP TABLE IF EXISTS "actions";
DROP TABLE IF EXISTS "fabricants";
DROP TABLE IF EXISTS "personnels";
DROP TABLE IF EXISTS "pieces";
DROP TABLE IF EXISTS "clients";
DROP TABLE IF EXISTS "constructeurs";

CREATE TABLE "constructeurs" (
  "id_constructeur" serial ,
  PRIMARY KEY ("id_constructeur"),
  "nom_constructeur" text NOT NULL
);

CREATE TABLE "clients" (
  "id_client" serial ,
  PRIMARY KEY ("id_client"),
  "nom_client" text NOT NULL,
  "prenom_client" text NOT NULL,
  "adresse_client" text NOT NULL,
  "mail_client" text NOT NULL,
  "telephone_client" text NOT NULL
);

CREATE TABLE "pieces" (
  "id_piece" serial ,
  PRIMARY KEY ("id_piece"),
  "nom_piece" text NOT NULL
);

CREATE TABLE "personnels" (
  "id_employe" serial ,
  PRIMARY KEY ("id_employe"),
  "nom_employe" text NOT NULL,
  "prenom_employe" text NOT NULL,
  "telephone_employe" text NOT NULL,
  "poste" text NOT NULL
);

CREATE TABLE "fabricants" (
  "id_fabricant" serial ,
  PRIMARY KEY ("id_fabricant"),
  "nom_fabricant" text NOT NULL,
  "adresse_fabricant" text NOT NULL
);

CREATE TABLE "actions" (
  "id_action" serial ,
  PRIMARY KEY ("id_action"),
  "cout_action" integer NOT NULL,
  "intitule" text NOT NULL,
  "duree" interval NOT NULL
);

CREATE TABLE "garages" (
  "id_garage" serial ,
  PRIMARY KEY ("id_garage"),
  "nom_garage" text NOT NULL,
  "adresse_garage" text NOT NULL
);

CREATE TABLE "modeles" (
  "id_modele" serial ,
  PRIMARY KEY ("id_modele"),
  "type_motorisation" text NOT NULL,
  "nom_modele" text NOT NULL,
  "id_constructeur" serial NOT NULL,

CONSTRAINT fk_constructeur
      FOREIGN KEY(id_constructeur) 
	  REFERENCES constructeurs(id_constructeur)
);

CREATE TABLE "vehicules" (
  "id_vehicule" serial ,
  PRIMARY KEY ("id_vehicule"),
  "immatriculation" text NOT NULL,
  "date_de_mise_en_circulation" date NOT NULL,
  "type_vehicule" text NOT NULL,
  "id_client" serial NOT NULL,
  "id_modele" serial NOT NULL,

CONSTRAINT fk_client
      FOREIGN KEY(id_client) 
	  REFERENCES clients(id_client),

CONSTRAINT fk_modele
      FOREIGN KEY(id_modele) 
	  REFERENCES modeles(id_modele)
);

CREATE TABLE "interventions" (
  "id_intervention" serial ,
  PRIMARY KEY ("id_intervention"),
  "date_prise_en_charge" date NOT NULL,
  "date_retour_prevue" date NOT NULL,
  "kilometrage" integer NOT NULL,
  "type_intervention" text NOT NULL,
  "etat_intervention" text NOT NULL,
  "origine_intervention" text NOT NULL,
  "id_vehicule" serial NOT NULL,
  "id_garage" serial NOT NULL,

CONSTRAINT fk_vehicule
      FOREIGN KEY(id_vehicule) 
	  REFERENCES vehicules(id_vehicule),
CONSTRAINT fk_garage
      FOREIGN KEY(id_garage) 
	  REFERENCES garages(id_garage)
);

CREATE TABLE "factures" (
  "id_facture" serial ,
  PRIMARY KEY ("id_facture"),
  "montant" integer NOT NULL,
  "id_intervention" serial NOT NULL,
  "id_client" serial NOT NULL,

CONSTRAINT fk_intervention
      FOREIGN KEY(id_intervention) 
	  REFERENCES interventions(id_intervention),
CONSTRAINT fk_client
      FOREIGN KEY(id_client) 
	  REFERENCES clients(id_client)
);

CREATE TABLE "contenir" (
  "id_modele" integer NOT NULL,
  "id_piece" integer NOT NULL,
  PRIMARY KEY (id_modele, id_piece),


CONSTRAINT fk_modele
      FOREIGN KEY(id_modele) 
	  REFERENCES modeles(id_modele),
CONSTRAINT fk_piece
      FOREIGN KEY(id_piece) 
	  REFERENCES pieces(id_piece)
);

CREATE TABLE "fabriquer" (
  "id_piece" integer NOT NULL,
  "id_fabricant" integer NOT NULL,
  PRIMARY KEY (id_piece, id_fabricant),
  "cout_piece" integer NOT NULL,

CONSTRAINT fk_piece
      FOREIGN KEY(id_piece) 
	  REFERENCES pieces(id_piece),
CONSTRAINT fk_fabricant
      FOREIGN KEY(id_fabricant) 
	  REFERENCES fabricants(id_fabricant)
);


CREATE TABLE "realiser" (
  "id_intervention" integer NOT NULL,
  "id_action" integer NOT NULL,
  PRIMARY KEY (id_intervention, id_action),

CONSTRAINT fk_intervention
      FOREIGN KEY(id_intervention) 
	  REFERENCES interventions(id_intervention),
CONSTRAINT fk_action
      FOREIGN KEY(id_action) 
	  REFERENCES actions(id_action)
);

CREATE TABLE "remplacer" (
  "id_piece" integer NOT NULL,
  "id_intervention" integer NOT NULL,
  PRIMARY KEY (id_piece, id_intervention),

CONSTRAINT fk_piece
      FOREIGN KEY(id_piece) 
	  REFERENCES pieces(id_piece),
CONSTRAINT fk_intervention
      FOREIGN KEY(id_intervention) 
	  REFERENCES interventions(id_intervention)
);

CREATE TABLE "travailler" (
  "id_intervention" integer NOT NULL,
  "id_employe" integer NOT NULL,
  PRIMARY KEY (id_intervention, id_employe),

CONSTRAINT fk_intervention
      FOREIGN KEY(id_intervention) 
	  REFERENCES interventions(id_intervention),

CONSTRAINT fk_employe
      FOREIGN KEY(id_employe) 
	  REFERENCES personnels(id_employe)
);
