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
   	PRIMARY KEY (id)
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
      REFERENCES   usuario  ( id )
);

CREATE TABLE informacion(
  id serial NOT NULL,
  idusuario integer,
  universidad varchar(255),
  ciudad varchar(255),
  pais varchar(255),
  carrera varchar(255),
  PRIMARY KEY (id),
  CONSTRAINT  idusuario 
      FOREIGN KEY ( idusuario )
      REFERENCES   usuario  ( id )
);

INSERT INTO usuario ( nombre,apellido,numero,correo,clave,sexo,fecha_nacimiento) VALUES
('Webbi','SA','0985992827','webbisolutions@gmail.com','teamwebbi','mujer','04-05-2018');

INSERT INTO usuario ( nombre,apellido,numero,correo,clave,sexo,fecha_nacimiento) VALUES
('Paola','Ortiz','0985992827','giiina.paola@gmail.com','jagger123','mujer','21-02-1996');

INSERT INTO usuario ( nombre,apellido,numero,correo,clave,sexo,fecha_nacimiento) VALUES
('Kimmy','Munoz','0985992827','lakimmy@gmail.com','rayito123','mujer','07-09-1996');

INSERT INTO respuesta (idusuario,rspPreferencia,rspVerde,rspDesayunoSalado,rspDesayunoDulce,rspAlmuerzo,rspMarisco,rspSopa,rspCena,rspComidaTipicaCosta,rspComidaTipicaSierra,rspComidaTipicaOriente,rspProteina,rspPostres,rspSaboresDulces,rspBebida,rspComidaExtranjera,rspComidaRapida) VALUES (1,'hombre','bolon','verde','panqueque','seco de pollo','ninguno','sopa de queso','carnes','arroz con menestra','fritada','ninguna','pollo','helado','chocolate','jugo','japonesa','salchipapa');
INSERT INTO respuesta (idusuario,rspPreferencia,rspVerde,rspDesayunoSalado,rspDesayunoDulce,rspAlmuerzo,rspMarisco,rspSopa,rspCena,rspComidaTipicaCosta,rspComidaTipicaSierra,rspComidaTipicaOriente,rspProteina,rspPostres,rspSaboresDulces,rspBebida,rspComidaExtranjera,rspComidaRapida) VALUES (1,'hombre','bolon','verde','panqueque','seco de pollo','ninguno','sopa de queso','carnes','arroz con menestra','fritada','ninguna','pollo','helado','chocolate','jugo','japonesa','salchipapa');

INSERT INTO informacion (idusuario,universidad,ciudad,pais,carrera) VALUES
(2,'ESPOL','Guayaquil','Ecuador','Diseño web y aplicaciones multimedia');
