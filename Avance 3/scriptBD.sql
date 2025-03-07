-- CREACION DE TABLAS -- 

-- Plan de Estudios -- 

CREATE TABLE IF NOT EXISTS public."Plan"
(
	"idPlan" varchar NOT NULL,
	nombre varchar,
	carrera varchar,
	CONSTRAINT "planPk" PRIMARY KEY ("idPlan")
);

CREATE TABLE IF NOT EXISTS public."CicloEscolar"
(
	"idCicloEscolar" varchar NOT NULL,
	"fechaInicio" date,
	"fechaFin" date,
	CONSTRAINT "cicloEscolarPk" PRIMARY KEY ("idCicloEscolar")
);


CREATE TABLE IF NOT EXISTS public."Materia"
(
	"idMateria" varchar NOT NULL,
	"nombreMateria" varchar,
	"idPlan" varchar,
	creditos decimal,
	"horasProfesor" numeric,
	equipamiento varchar,
	CONSTRAINT "materiaPk" PRIMARY KEY ("idMateria"),
	CONSTRAINT "materiaFk" FOREIGN KEY ("idPlan")
		REFERENCES public."Plan"("idPlan") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Rol de Materia -- 

CREATE TABLE IF NOT EXISTS public."Requisito"
(
	"idMateria" varchar NOT NULL,
	requisito varchar NOT NULL,
	CONSTRAINT "requisitoPk" PRIMARY KEY ("idMateria", requisito),
	CONSTRAINT "requisitoFk" FOREIGN KEY ("idMateria") 
		REFERENCES public."Materia" ("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "materiaFk2" FOREIGN KEY (requisito)
		REFERENCES public."Materia" ("idMateria") MATCH  SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Salon"
(
	"idSalon" varchar NOT NULL,
	cupo integer,
	descripcion varchar,
	CONSTRAINT "salonPk" PRIMARY KEY ("idSalon")
);

CREATE TABLE IF NOT EXISTS public."Profesor"
(
	"matriculaProfesor" varchar NOT NULL,
	"nombreProfesor" varchar,
	CONSTRAINT "profesorPk" PRIMARY KEY ("matriculaProfesor")
);

CREATE TABLE IF NOT EXISTS public."Usuario"
(
	"idIVD" varchar NOT NULL,
	"nombreUsuario" varchar,
	"password" varchar,
	"correoInstitucional" varchar,
	CONSTRAINT "usuarioPk" PRIMARY KEY ("idIVD")
);

CREATE TABLE IF NOT EXISTS public."Alumno"
(
	matricula varchar NOT NULL,
	semestre varchar,
	regular boolean,
carrera varchar,
	CONSTRAINT "alumnoPk" PRIMARY KEY (matricula),
	CONSTRAINT "alumnoFk" FOREIGN KEY (matricula)
		REFERENCES public."Usuario" ("idIVD") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Administrador"
(
	"idIVD" varchar NOT NULL,
	carrera varchar,
	CONSTRAINT "administradorPk" PRIMARY KEY ("idIVD"),
	CONSTRAINT "administradorFk" FOREIGN KEY ("idIVD")
		REFERENCES public."Usuario" MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Grupo"
(
	"idGrupo" varchar NOT NULL,
	"idMateria" varchar,
	"matriculaProfesor" varchar,
	"idSalon" varchar,
	CONSTRAINT "grupoPk" PRIMARY KEY ("idGrupo"),
	CONSTRAINT "grupoFk" FOREIGN KEY ("idMateria")
		REFERENCES public."Materia" ("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "grupoFk2" FOREIGN KEY ("matriculaProfesor")
		REFERENCES public."Profesor" ("matriculaProfesor") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "grupoFk3" FOREIGN KEY ("idSalon")
		REFERENCES public."Salon" ("idSalon") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Grupos a los que se inscribe el alumno -- 

CREATE TABLE IF NOT EXISTS public."Enlista"
(
	"idGrupo" varchar NOT NULL,
	matricula varchar NOT NULL,
	CONSTRAINT "enlistaPk" PRIMARY KEY ("idGrupo",matricula),
	CONSTRAINT "enlistaFk" FOREIGN KEY ("idGrupo")
		REFERENCES public."Grupo" ("idGrupo") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "enlistaFk2" FOREIGN KEY (matricula)
		REFERENCES public."Alumno" (matricula) MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Fecha de disponibilidad del profesor -- 

CREATE TABLE IF NOT EXISTS public."Disponible"
(
	"idCicloEscolar" varchar NOT NULL,
	"matriculaProfesor" varchar NOT NULL,
	lunes time without time zone[],
	martes time without time zone[],
	miercoles time without time zone[],
	jueves time without time zone[],
	viernes time without time zone[],
	CONSTRAINT "disponiblePk" PRIMARY KEY ("idCicloEscolar","matriculaProfesor"),
	CONSTRAINT "disponibleFk" FOREIGN KEY ("idCicloEscolar")
		REFERENCES public."CicloEscolar" ("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "disponibleFk2" FOREIGN KEY ("matriculaProfesor")
		REFERENCES public."Profesor" ("matriculaProfesor") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Oferta de materias en un ciclo escolar-- 

CREATE TABLE IF NOT EXISTS public."Ofrece"
(
	"idCicloEscolar" varchar NOT NULL,
	"idMateria" varchar NOT NULL,
	CONSTRAINT "ofrecePk" PRIMARY KEY ("idCicloEscolar","idMateria"),
	CONSTRAINT "ofreceFk" FOREIGN KEY ("idCicloEscolar") 
		REFERENCES public."CicloEscolar"("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "ofreceFk2" FOREIGN KEY ("idMateria") 
		REFERENCES public."Materia"("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Grupos que se abren en el ciclo escolar -- 

CREATE TABLE IF NOT EXISTS public."Abre"
(
	"idCicloEscolar" varchar NOT NULL,
	"idGrupo" varchar NOT NULL,
	CONSTRAINT "abrePk" PRIMARY KEY ("idCicloEscolar","idGrupo"),
	CONSTRAINT "abreFk" FOREIGN KEY ("idCicloEscolar") 
		REFERENCES public."CicloEscolar"("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "abreFk2" FOREIGN KEY ("idGrupo") 
		REFERENCES public."Grupo"("idGrupo") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

-- Cambios solicitados por el alumno -- 

CREATE TABLE IF NOT EXISTS public."SolicitaCambio"
(
	matricula varchar NOT NULL,
	"idMateria" varchar NOT NULL,
	resuelto boolean,
	descripcion varchar,
	"fechaSolicitud" date,
	"fechaResolucion" date,
	CONSTRAINT "solicitaCambioPk" PRIMARY KEY (matricula, "idMateria"),
	CONSTRAINT "solicitaCambioFk" FOREIGN KEY (matricula)
		REFERENCES public."Alumno"(matricula) MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "solicitaCambioFk2" FOREIGN KEY ("idMateria")
		REFERENCES public."Materia"("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);




-- INSERCION DE DATOS -- 

-- Plan de Estudios --

INSERT INTO "Plan" ("idPlan", nombre, carrera) VALUES('P001', 'PDMIV25', 'Diseño de la Moda e Industria del Vestido'), ('P002', 'PDAI25', 'Diseno y Arquitectura de Interiores');

-- Ciclo Escolar -- 

INSERT INTO "CicloEscolar" ("idCicloEscolar", "fechaInicio", "fechaFin")
VALUES ('FebJun15', '2015-02-25', '2015-06-25'),
('AgoDic15', '2015-08-17','2015-12-03'),
('FebJun16', '2016-02-19', '2016-06-20'),
('AgoDic16', '2016-08-18', '2016-12-19'),
('FebJun17', '2017-02-22', '2017-06-18'),
('AgoDic17', '2017-08-19', '2017-12-17'),
('FebJun18', '2018-02-21', '2018-06-16'),
('AgoDic18', '2018-08-15', '2018-12-15'),
('FebJun19', '2019-02-17', '2019-06-14'),
('AgoDic19', '2019-08-10', '2019-12-10'),
('FebJun20', '2020-02-20', '2020-06-11'),
('AgoDic20', '2020-08-16', '2020-12-12'),
('FebJun21', '2021-02-18', '2021-06-13'),
('AgoDic21', '2021-08-19', '2021-12-14'),
('FebJun22', '2022-02-15', '2022-06-15'),
('AgoDic22', '2022-08-14', '2022-12-10'),
('FebJun23', '2023-02-13', '2023-06-09'),
('AgoDic23', '2023-08-11', '2023-12-08'),
('FebJun24', '2024-02-10', '2024-06-07'),
('AgoDic24', '2024-08-20', '2024-12-06'),
('FebJun25', '2025-02-19', '2025-06-05'),
('AgoDic25', '2025-08-21', '2025-12-04');

-- Materia --

INSERT INTO "Materia" ("idMateria", "nombreMateria", "idPlan", "creditos", "horasProfesor", "equipamiento")
VALUES ('M001', 'Historia del Arte', 'P001', 15, 8 , ''),
('M002', 'Historia de la Arquitectura I', 'P002', 18, 10, ''),
('M003', 'Historia de la Arquitectura II', 'P002', 18, 10, ''),
('M004', 'Diseño de Accesorios', 'P001', 17, 12, 'Máquina ACC3000'),
('M005', 'Materiales Textiles', 'P001', 21, 6, ''),
('M006', 'Modelado en Maniquí I', 'P001', 15, 10, 'Maniquí'),
('M007', 'Modelado en Maniquí II', 'P001', 17, 14, 'Maniquí'),
('M008', 'Diseño de Paisaje', 'P002', 17, 15, 'Mesas de taller'),
('M009', 'Psicología del Espacio', 'P002', 18, 18, ''),
('M010', 'Iluminación y Acústica', 'P002', 17, 15, 'Lámparas ISH'),
('M011', 'Aplicación Textil I', 'P001', 17, 4, 'Mesas de taller'),
('M012', 'Aplicación Textil II', 'P001', 18, 6, 'Mesas de taller'),
('M013', 'Conceptos y Tendencias de la Moda I', 'P001', 15, 6, ''),
('M014', 'Conceptos y Tendencias de la Moda II', 'P001', 17, 6, ''),
('M015', 'Modelación Digital I', 'P001', 21, 15, 'Tabletas XP1900'),
('M016', 'Modelación Digital II', 'P001', 21, 20, 'Tabletas XP1925'),
('M017', 'Modelos y Prototipos de Mobiliario', 'P002', 21, 20, 'Mesas de taller'),
('M018', 'Fundamentos de Mercadotecnia', 'P002', 21, 20, ''),
('M019', 'Imagen Corporativa', 'P002', 21, 20, ''),
('M020', 'Ilustración Gráfica Digital', 'P002', 21, 20, 'Computadoras XP2070');

-- Requisito -- 

INSERT INTO "Requisito" ("idMateria", requisito)
VALUES ('M003','M002'),
('M007', 'M006'),
('M012',' M011'),
('M014', 'M013'),
('M016', 'M015');

-- Salon --

INSERT INTO "Salon" ("idSalon", cupo, descripcion)
VALUES ('S001', 10, 'Aula normal'),
('S002', 15,  'Aula normal'),
('S003', 10,  'Aula normal'),
('S004', 15,  'Aula normal'),
('S005', 10,  'Aula normal'),
('S006', 10, 'Taller de telas'),
('S007', 10, 'Lamparas ISH'),
('S008', 15, 'Aula de computadoras'),
('S009', 8, 'Aula de maquinaria'),
('S010', 8, 'Taller de telas'),
('S011', 7, '20 Maniquies'),
('S012', 10, '15 lamparas SH'),
('S013', 10, 'Aula normal'),
('S014', 5, 'Aula normal'),
('S015', 5, 'Aula normal');


-- Profesor --

INSERT INTO "Profesor" ("matriculaProfesor","nombreProfesor")
VALUES ('IVD012902', 'Alberto Méndez Álvarez'),
('IVD83721', 'Juan Ignacio Arriola Ruíz'),
('IVD56893', 'Antonia García Heche'),
('IVD42452', 'Esther Vázquez Herrera'),
('IVD53916', 'Beatriz Paredes Sevilla'),
('IVD92482', 'Inés Pineda González');

-- Usuario -- 

INSERT INTO "Usuario" ("idIVD", "nombreUsuario", "password","correoInstitucional")
VALUES('IVD99023', 'Elena Domínguez', 'aJsqeCFw34Far','edominguez@IVD.mx'),
('IVD27384', 'Paloma Núñez Luna', 'IEWE8aefcsw','pnunez@IVD.mx'),
('IVD012902', 'Alberto Méndez Álvarez', 'jncfinhuq33842938ed', 'amendez@IVD.mx'),
('IVD83721', 'Juan Ignacio Arriola Ruíz', 'iuo394uf89ecij', 'jarriola@IVD.mx'),
('IVD56893', 'Antonia García Heche', '98q98qwud', 'agarcia@IVD.mx'),
('IVD42452', 'Esther Vázquez Herrera', 'qwdxp12o', 'evazquez@IVD.mx'),
('IVD53916', 'Beatriz Paredes Sevilla', '59iyh6hjj', 'bparedes@IVD.mx'),
('IVD92482', 'Inés Pineda González', '0923829', 'igonzalez@IVD.mx'),
('IVD87493', 'Jorge Cáceres Ochoa', 'Contrasena123', 'jcaceres@IVD.mx'),
('IVD87494', 'Mariana López Herrera', 'LokiMiGato22', 'mlopez@IVD.mx'),  
('IVD87495', 'Ricardo Gómez Nieto', 'AmoLasTortas99', 'rgomez@IVD.mx'),  
('IVD87496', 'Fernanda Ruiz Salgado', 'PikachuEsReal01', 'fruiz@IVD.mx'),  
('IVD87497', 'Alejandro Torres Velasco', 'PerroSalchicha07', 'atorres@IVD.mx'),  
('IVD87498', 'Laura Méndez Rivas', 'ViajarSinDinero24', 'lmendez@IVD.mx'),  
('IVD87499', 'Daniel Vázquez Ortega', 'GatoDormilón88', 'dvazquez@IVD.mx'),  
('IVD87500', 'Gabriela Sánchez Pineda', 'OdioLevantarm3', 'gsanchez@IVD.mx'),  
('IVD87501', 'José Luis Perea Castro', 'CaféYPeliculas12', 'jperea@IVD.mx'),  
('IVD87502', 'Valeria Ortega Román', 'PugEnMochila99', 'vortega@IVD.mx'),  
('IVD87503', 'Sebastián Herrera Núñez', 'NoMasTareas777', 'sherrera@IVD.mx'),  
('IVD87504', 'Camila Estrada Lozano', 'QuieroPizzaYa', 'cestrada@IVD.mx'),  
('IVD87505', 'Andrés Velázquez Quiróz', 'PerritoFeliz44', 'avelazquez@IVD.mx'),  
('IVD87506', 'Natalia Ríos Jiménez', 'MiGatoMeOdia02', 'nrios@IVD.mx'),  
('IVD87507', 'Juan Pablo Pérez Galván', 'DormirEsUnLujo', 'jperez@IVD.mx'),  
('IVD87508', 'Sofía Delgado Varela', 'NetflixYNachos21', 'sdelgado@IVD.mx'),  
('IVD87509', 'Iván Morales Fuentes', 'HamsterLoco19', 'imorales@IVD.mx'),  
('IVD87510', 'Andrea Gutiérrez Salas', 'AutoRojoRápido', 'agutierrez@IVD.mx'),  
('IVD87511', 'Emiliano Castro Hernández', 'AmoLosGatosXD', 'ecastro@IVD.mx'),  
('IVD87512', 'Paulina Ramos Cervantes', 'QuieroUnPerrito', 'pramos@IVD.mx'),  
('IVD87513', 'Roberto Núñez Olvera', 'NoMasExamenes25', 'rnunez@IVD.mx');  

-- Alumno -- 

INSERT INTO "Alumno" (matricula, semestre, regular, carrera)
VALUES ('IVD87493', 1, true, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87494', 2, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87495', 3, false, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87496', 4, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87497', 5, true, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87498', 1, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87499', 2, false, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87500', 3, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87501', 4, true, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87502', 5, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87503', 6, true, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87504', 7, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87505', 8, false, 'Diseño de la Moda e Industria del Vestido'),  
('IVD87506', 1, true, 'Diseño y Arquitectura de Interiores'),  
('IVD87507', 2, true, 'Diseño de la Moda e Industria del Vestido');  


-- Administrador --

INSERT INTO "Administrador" ("idIVD", carrera)
VALUES ('IVD87509', 'Diseño de la Moda e Industria del Vestido'), 
('IVD87510', 'Diseño y Arquitectura de Interiores'),
('IVD87511',  'Diseño de la Moda e Industria del Vestido'),
('IVD87512', 'Diseño y Arquitectura de Interiores'),
('IVD87513', 'Diseño de la Moda e Industria del Vestido');  

-- Grupo --

INSERT INTO "Grupo" ("idGrupo", "idMateria", "matriculaProfesor", "idSalon")
VALUES('G001', 'M001', 'IVD012902', 'S001'),
('G002', 'M002', 'IVD83721', 'S002'),
('G003', 'M003', 'IVD83721', 'S003'),
('G004', 'M004', 'IVD56893', 'S009'),
('G005', 'M005', 'IVD56893', 'S006'),
('G006', 'M006', 'IVD42452', 'S011'),
('G007', 'M007', 'IVD42452', 'S011'),
('G008', 'M008', 'IVD53916', 'S004'),
('G009', 'M009', 'IVD53916', 'S005'),
('G010', 'M010', 'IVD53916', 'S007'),
('G011', 'M011', 'IVD92482', 'S006'),
('G012', 'M012', 'IVD92482', 'S010'),
('G013', 'M013', 'IVD012902', 'S006'),
('G014', 'M014', 'IVD012902', 'S010'),
('G015', 'M015', 'IVD83721', 'S008'),
('G016', 'M016', 'IVD83721', 'S008'),
('G017', 'M017', 'IVD56893', 'S009'),
('G018', 'M018', 'IVD56893', 'S001'),
('G019', 'M019', 'IVD42452', 'S002'),
('G020', 'M020', 'IVD42452', 'S008');

-- Enlista --

INSERT INTO "Enlista" ("idGrupo", matricula)
VALUES ('G001', 'IVD87493'),
('G001', 'IVD87495'),
('G001', 'IVD87497'),
('G002', 'IVD87494'),
('G002', 'IVD87500'),
('G002', 'IVD87502'),
('G003', 'IVD87494'),
('G003', 'IVD87500'),
('G003', 'IVD87504'),
('G004', 'IVD87493'),
('G004', 'IVD87495'),
('G004', 'IVD87497'),
('G005', 'IVD87493'),
('G005', 'IVD87501'),
('G005', 'IVD87503'),
('G006', 'IVD87493'),
('G006', 'IVD87497'),
('G006', 'IVD87501'),
('G007', 'IVD87493'),
('G007', 'IVD87501'),
('G007', 'IVD87503'),
('G008', 'IVD87494'),
('G008', 'IVD87500'),
('G008', 'IVD87502'),
('G009', 'IVD87494'),
('G009', 'IVD87500'),
('G009', 'IVD87504'),
('G010', 'IVD87494'),
('G010', 'IVD87500'),
('G010', 'IVD87504'),
('G011', 'IVD87493'),
('G011', 'IVD87497'),
('G011', 'IVD87501'),
('G012', 'IVD87493'),
('G012', 'IVD87501'),
('G012', 'IVD87503'),
('G013', 'IVD87493'),
('G013', 'IVD87495'),
('G013', 'IVD87497'),
('G014', 'IVD87493'),
('G014', 'IVD87501'),
('G014', 'IVD87503'),
('G015', 'IVD87494'),
('G015', 'IVD87500'),
('G015', 'IVD87502'),
('G016', 'IVD87494'),
('G016', 'IVD87500'),
('G016', 'IVD87504'),
('G017', 'IVD87494'),
('G017', 'IVD87500'),
('G017', 'IVD87502'),
('G018', 'IVD87494'),
('G018', 'IVD87500'),
('G018', 'IVD87504'),
('G019', 'IVD87494'),
('G019', 'IVD87500'),
('G019', 'IVD87502'),
('G020', 'IVD87494'),
('G020', 'IVD87500'),
('G020', 'IVD87504');

-- Disponible --

INSERT INTO "Disponible" ("idCicloEscolar", "matriculaProfesor", lunes,martes,miercoles,jueves,viernes)
VALUES ('FebJun15', 'IVD012902', '{08:00,12:00}', '{10:00,14:00}', '{}', '{10:00,14:00}', '{08:00,12:00}'),  
('FebJun15', 'IVD83721', '{09:00,13:00}', '{}', '{09:00,13:00}', '{11:00,15:00}', '{}'),  
('FebJun15', 'IVD56893', '{07:00,11:00}', '{}', '{07:00,11:00}', '{}', '{07:00,11:00}'),  

('AgoDic15', 'IVD42452', '{}', '{10:00,14:00}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('AgoDic15', 'IVD53916', '{10:00,14:00}', '{12:00,15:00}', '{}', '{}', '{10:00,14:00}'),  
('AgoDic15', 'IVD92482', '{}', '{09:30,13:30}', '{07:30,11:30}', '{09:30,13:30}', '{}'),  

('FebJun16', 'IVD012902', '{08:00,12:00}', '{}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('FebJun16', 'IVD83721', '{09:00,13:00}', '{11:00,15:00}', '{}', '{11:00,15:00}', '{}'),  
('FebJun16', 'IVD56893', '{07:00,11:00}', '{09:00,13:00}', '{}', '{09:00,13:00}', '{}'),  
('FebJun16', 'IVD42452', '{}', '{10:00,14:00}', '{}', '{10:00,14:00}', '{08:00,12:00}'),  
('FebJun16', 'IVD53916', '{10:00,14:00}', '{}', '{10:00,14:00}', '{12:00,15:00}', '{}'),  

('AgoDic16', 'IVD92482', '{}', '{09:30,13:30}', '{}', '{09:30,13:30}', '{07:30,11:30}'),  
('AgoDic16', 'IVD012902', '{08:00,12:00}', '{10:00,14:00}', '{}', '{10:00,14:00}', '{}'),  
('AgoDic16', 'IVD83721', '{09:00,13:00}', '{}', '{09:00,13:00}', '{}', '{09:00,13:00}'),  

('FebJun17', 'IVD56893', '{}', '{09:00,13:00}', '{07:00,11:00}', '{09:00,13:00}', '{}'),  
('FebJun17', 'IVD42452', '{08:00,12:00}', '{}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('FebJun17', 'IVD53916', '{}', '{12:00,15:00}', '{10:00,14:00}', '{}', '{10:00,14:00}'),  
('FebJun17', 'IVD92482', '{07:30,11:30}', '{}', '{07:30,11:30}', '{09:30,13:30}', '{}'),  

('AgoDic17', 'IVD012902', '{}', '{10:00,14:00}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('AgoDic17', 'IVD83721', '{09:00,13:00}', '{}', '{09:00,13:00}', '{11:00,15:00}', '{}'), 
('AgoDic17', 'IVD56893', '{07:00,11:00}', '{09:00,13:00}', '{}', '{09:00,13:00}', '{}'),  

('FebJun18', 'IVD42452', '{}', '{10:00,14:00}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('FebJun18', 'IVD53916', '{10:00,14:00}', '{12:00,15:00}', '{}', '{}', '{10:00,14:00}'),  
('FebJun18', 'IVD92482', '{}', '{09:30,13:30}', '{07:30,11:30}', '{09:30,13:30}', '{}'), 

('AgoDic18', 'IVD012902', '{08:00,12:00}', '{}', '{08:00,12:00}', '{}', '{08:00,12:00}'),  
('AgoDic18', 'IVD83721', '{09:00,13:00}', '{11:00,15:00}', '{}', '{11:00,15:00}', '{}'),  
('AgoDic18', 'IVD56893', '{07:00,11:00}', '{09:00,13:00}', '{}', '{09:00,13:00}', '{}'),  
('AgoDic18', 'IVD42452', '{}', '{10:00,14:00}', '{}', '{10:00,14:00}', '{08:00,12:00}'),  
('AgoDic18', 'IVD53916', '{10:00,14:00}', '{}', '{10:00,14:00}', '{12:00,15:00}', '{}');  


-- Ofrece --

INSERT INTO "Ofrece" ("idCicloEscolar", "idMateria")
VALUES ('FebJun15', 'M001'),  
('FebJun15', 'M002'),  
('FebJun15', 'M004'),  
('FebJun15', 'M005'),  
('AgoDic15', 'M003'),  
('AgoDic15', 'M006'),  
('AgoDic15', 'M007'),  
('AgoDic15', 'M008'),  
('FebJun16', 'M009'),  
('FebJun16', 'M010'),  
('FebJun16', 'M011'),  
('FebJun16', 'M012'),  
('FebJun16', 'M013'),  
('AgoDic16', 'M014'),  
('AgoDic16', 'M015'),  
('AgoDic16', 'M016'),  
('AgoDic16', 'M017'),  
('FebJun17', 'M018'),  
('FebJun17', 'M019'),  
('FebJun17', 'M020'),  
('AgoDic17', 'M001'),  
('AgoDic17', 'M002'),  
('AgoDic17', 'M003'),  
('AgoDic17', 'M004'),  
('FebJun18', 'M005'),  
('FebJun18', 'M006'),  
('FebJun18', 'M007'),  
('FebJun18', 'M008'),  
('AgoDic18', 'M009'),  
('AgoDic18', 'M010'),  
('AgoDic18', 'M011'),  
('AgoDic18', 'M012'),  
('FebJun19', 'M013'),  
('FebJun19', 'M014'),  
('FebJun19', 'M015'),  
('AgoDic19', 'M016'),  
('AgoDic19', 'M017'),  
('AgoDic19', 'M018'),  
('FebJun20', 'M019'),  
('FebJun20', 'M020'),  
('AgoDic20', 'M001'),  
('AgoDic20', 'M002'),  
('AgoDic20', 'M003'),  
('FebJun21', 'M004'),  
('FebJun21', 'M005'),  
('AgoDic21', 'M006'),  
('AgoDic21', 'M007'), 
('AgoDic21', 'M008'),  
('FebJun22', 'M009'), 
('FebJun22', 'M010'),  
('AgoDic22', 'M011'),  
('AgoDic22', 'M012'),  
('FebJun23', 'M013'),  
('FebJun23', 'M014'),  
('AgoDic23', 'M015'),  
('AgoDic23', 'M016'),  
('FebJun24', 'M017'),  
('FebJun24', 'M018'),  
('AgoDic24', 'M019'),  
('AgoDic24', 'M020'),  
('FebJun25', 'M001'),  
('FebJun25', 'M002'),  
('AgoDic25', 'M003'),  
('AgoDic25', 'M004');  

-- Abre -- 
INSERT INTO "Abre" ("idCicloEscolar", "idGrupo")
VALUES ('FebJun15', 'G001'),
('FebJun15', 'G002'),
('FebJun15', 'G003'),
('AgoDic15', 'G004'),
('AgoDic15', 'G005'),
('AgoDic15', 'G006'),
('FebJun16', 'G007'),
('FebJun16', 'G008'),
('FebJun16', 'G009'),
('AgoDic16', 'G010'),
('AgoDic16', 'G011'),
('AgoDic16', 'G012'),
('FebJun17', 'G013'),
('FebJun17', 'G014'),
('FebJun17', 'G015'),
('AgoDic17', 'G016'),
('AgoDic17', 'G017'),
('AgoDic17', 'G018'),
('FebJun18', 'G019'),
('FebJun18', 'G020'),
('FebJun18', 'G001'),
('AgoDic18', 'G002'),
('AgoDic18', 'G003'),
('AgoDic18', 'G004'),
('FebJun19', 'G005'),
('FebJun19', 'G006'),
('FebJun19', 'G007'),
('AgoDic19', 'G008'),
('AgoDic19', 'G009'),
('AgoDic19', 'G010'),
('FebJun20', 'G011'),
('FebJun20', 'G012'),
('FebJun20', 'G013'),
('AgoDic20', 'G014'),
('AgoDic20', 'G015'),
('AgoDic20', 'G016'),
('FebJun21', 'G017'),
('FebJun21', 'G018'),
('FebJun21', 'G019'),
('AgoDic21', 'G020'),
('AgoDic21', 'G001'),
('AgoDic21', 'G002'),
('FebJun22', 'G003'),
('FebJun22', 'G004'),
('FebJun22', 'G005'),
('AgoDic22', 'G006'),
('AgoDic22', 'G007'),
('AgoDic22', 'G008'),
('FebJun23', 'G009'),
('FebJun23', 'G010'),
('AgoDic23', 'G011'),
('AgoDic23', 'G012'),
('AgoDic23', 'G013'),
('FebJun24', 'G014'),
('FebJun24', 'G015'),
('AgoDic24', 'G016'),
('AgoDic24', 'G017'),
('FebJun25', 'G018'),
('FebJun25', 'G019'),
('AgoDic25', 'G020');

-- Solicita Cambio --

INSERT INTO "SolicitaCambio" (matricula, "idMateria", resuelto, descripcion, "fechaSolicitud", "fechaResolucion") 
VALUES ('IVD87493', 'M001', TRUE, 'Cambio solicitado por incompatibilidad de horario.', '2024-02-10 08:30:00', '2024-02-12 10:00:00'),
('IVD87494', 'M002', TRUE, 'El alumno desea cambiar de materia debido a preferencia personal.', '2024-02-11 09:00:00', '2024-02-13 11:30:00'),
('IVD87495', 'M003', FALSE, 'Solicita cambio debido a dificultad con el contenido.', '2024-02-12 10:15:00', NULL),
('IVD87496', 'M004', TRUE, 'El profesor recomendó cambio a otra materia más adecuada.', '2024-02-13 11:00:00', '2024-02-15 14:00:00'),
('IVD87497', 'M005', FALSE, 'Cambio solicitado porque la materia no cumple expectativas.', '2024-02-14 13:00:00', NULL),
('IVD87498', 'M006', TRUE, 'Problemas con el equipamiento en la materia.', '2024-02-15 14:30:00', '2024-02-17 16:00:00'),
('IVD87499', 'M007', FALSE, 'Cambio solicitado por exceso de carga académica.', '2024-02-16 15:45:00', NULL),
('IVD87500', 'M008', TRUE, 'Incompatibilidad con el horario de otras materias.', '2024-02-17 16:30:00', '2024-02-19 18:00:00'),
('IVD87501', 'M009', TRUE, 'Cambio debido a problemas personales con el profesor.', '2024-02-18 17:00:00', '2024-02-20 19:30:00'),
('IVD87502', 'M010', FALSE, 'El alumno no pudo conseguir el material necesario para la materia.', '2024-02-19 18:45:00', NULL),
('IVD87503', 'M011', TRUE, 'Cambio solicitado porque la materia no era lo esperado.', '2024-02-20 19:15:00', '2024-02-22 21:00:00'),
('IVD87504', 'M012', TRUE, 'El estudiante cambió de especialización.', '2024-02-21 20:30:00', '2024-02-23 22:00:00'),
('IVD87505', 'M013', FALSE, 'Cambio por falta de interés en el contenido del curso.', '2024-02-22 21:00:00', NULL),
('IVD87506', 'M014', TRUE, 'Cambio solicitado debido a sugerencia de asesor académico.', '2024-02-23 22:30:00', '2024-02-25 23:30:00'),
('IVD87507', 'M015', FALSE, 'El alumno desea cambiar a una materia más avanzada.', '2024-02-24 23:00:00', NULL);
