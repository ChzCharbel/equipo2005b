const db = require('../util/database');
const Pool = require('pg-pool');

const pool = new Pool();

module.exports = class Materia{

    constructor(mi_id, mi_nombre){
        this.id = mi_id;
        this.name = mi_nombre;
    }

    static fetchAll() {
        return pool.query(`Select * from "Materia";`);
    }

    static fetchOne(materiaId){
        return pool.query(`Select * from "Materia" Where "idMateria" = $1::text;`, [materiaId]);
    }
}