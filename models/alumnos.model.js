const db = require('../util/database');

module.exports = class Alumno {
    static fetchAll() {
		return db.query(`SELECT u."nombreUsuario", a.matricula, a.carrera, a.regular, a.semestre
    FROM "Alumno" a, "Usuario" u WHERE a.matricula = u."idIVD";`);
	}
	static fetchOne(id){
		return db.query(`SELECT u."nombreUsuario", a.matricula, a.carrera, a.regular, a.semestre
    FROM "Alumno" a, "Usuario" u WHERE a.matricula = u."idIVD" AND a."matricula" = $1::text`, [id]);
	}
}