/* create database LOVEFOOD */
CREATE TABLE usuario(
	id serial NOT NULL,
	nombre varchar(255),
  apellido varchar(255),
  numero varchar(255),
  correo varchar(255),
  clave varchar(255),
  sexo varchar(255),
  fecha_nacimiento varchar(255),
   	PRIMARY KEY (id);
);

CREATE TABLE respuesta(
  id serial NOT NULL,
  idusuario integer,
  rspPreferencia varchar(255),
  rspVerde varchar(255),
  rspDesayunoSalado varchar(255),
  rspDesayunoDulce varchar(255),
  rspAlmuerzo varchar(255),
  rspMarisco varchar(255),
  rspSopa varchar(255),
  rspCena varchar(255),
  rspComidaTipicaCosta varchar(255),
  rspComidaTipicaSierra varchar(255),
  rspComidaTipicaOriente varchar(255),
  rspProteina varchar(255),
  rspPostres varchar(255),
  rspSaboresDulces varchar(255),
  rspBebida varchar(255),
  rspComidaExtranjera varchar(255),
  rspComidaRapida varchar(255),
  PRIMARY KEY (id),
  CONSTRAINT  idusuario 
      FOREIGN KEY ( idusuario )
      REFERENCES   usuario  ( id ));
);

