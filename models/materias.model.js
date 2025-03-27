const db = require('../util/database');

module.exports = class Materia{

    constructor(mi_id, mi_nombre){
        this.id = mi_id;
        this.name = mi_nombre;
    }

    static fetchAll() {
        return db.query(`Select * from "Materia";`);
    }

    static fetchOne(materiaId){
        return db.query(`Select * from "Materia" Where "idMateria" = $1::text;`, [materiaId]);
    }
}