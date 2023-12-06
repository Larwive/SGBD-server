CREATE TABLE "constructeurs" (
  "id_constructeur" serial ,
  PRIMARY KEY ("id_constructeur"),
  "nom_constructeur" text NOT NULL CHECK (nom_constructeur <> '')
);

CREATE TABLE "clients" (
  "id_client" serial ,
  PRIMARY KEY ("id_client"),
  "nom_client" text NOT NULL CHECK (nom_client <> ''),
  "prenom_client" text NOT NULL CHECK (prenom_client <> ''),
  "adresse_client" text NOT NULL CHECK (adresse_client <> ''),
  "mail_client" text NOT NULL CHECK (mail_client <> ''),
  "telephone_client" text NOT NULL CHECK (telephone_client <> '')
);

CREATE TABLE "pieces" (
  "id_piece" serial ,
  PRIMARY KEY ("id_piece"),
  "nom_piece" text NOT NULL CHECK (nom_piece <> ''),
  UNIQUE (nom_piece)
);

CREATE TABLE "personnels" (
  "id_employe" serial ,
  PRIMARY KEY ("id_employe"),
  "nom_employe" text NOT NULL CHECK (nom_employe <> ''),
  "prenom_employe" text NOT NULL CHECK (prenom_employe <> ''),
  "telephone_employe" text NOT NULL CHECK (telephone_employe <> ''),
  "poste" text NOT NULL CHECK (poste <> '')
);

CREATE TABLE "fabricants" (
  "id_fabricant" serial ,
  PRIMARY KEY ("id_fabricant"),
  "nom_fabricant" text NOT NULL CHECK (nom_fabricant <> ''),
  "adresse_fabricant" text NOT NULL CHECK (adresse_fabricant <> '')
);

CREATE TABLE "actions" (
  "id_action" serial ,
  PRIMARY KEY ("id_action"),
  "cout_action" integer NOT NULL,
  "intitule" text NOT NULL CHECK (intitule <> ''),
  "duree" interval NOT NULL,
  UNIQUE (intitule)
);

CREATE TABLE "garages" (
  "id_garage" serial ,
  PRIMARY KEY ("id_garage"),
  "nom_garage" text NOT NULL CHECK (nom_garage <> ''),
  "adresse_garage" text NOT NULL CHECK (adresse_garage <> '')
);

CREATE TABLE "modeles" (
  "id_modele" serial ,
  PRIMARY KEY ("id_modele"),
  "type_motorisation" text NOT NULL CHECK (type_motorisation <> ''),
  "nom_modele" text NOT NULL CHECK (nom_modele <> ''),
  "id_constructeur" serial NOT NULL,

CONSTRAINT fk_constructeur
      FOREIGN KEY(id_constructeur) 
	  REFERENCES constructeurs(id_constructeur)
);

CREATE TABLE "vehicules" (
  "id_vehicule" serial ,
  PRIMARY KEY ("id_vehicule"),
  "immatriculation" text NOT NULL CHECK (immatriculation <> ''),
  "date_de_mise_en_circulation" date NOT NULL,
  "type_vehicule" text NOT NULL CHECK (type_vehicule <> ''),
  "id_client" serial NOT NULL,
  "id_modele" serial NOT NULL,
  UNIQUE (immatriculation),

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
  "type_intervention" text NOT NULL CHECK (type_intervention <> ''),
  "etat_intervention" text NOT NULL CHECK (etat_intervention <> ''),
  "origine_intervention" text NOT NULL CHECK (origine_intervention <> ''),
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
  "date_facture" date NOT NULL,

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
