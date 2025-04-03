const db = require('../util/database');

module.exports = class CicloEscolar {
    constructor(mi_id, mi_fecha_inicio, mi_fecha_fin) {
        this.id = mi_id;
        this.fechaInicio = mi_fecha_inicio;
        this.fechaFin = mi_fecha_fin;
    }

    save() {
        return db.query(`INSERT INTO "CicloEscolar" VALUES ($1::text, $2::text, $3::text);`, [this.id, this.fechaInicio, this.fechaFin]);
    }

    static fetchAll() {
        return db.query(`SELECT * FROM "CicloEscolar"`);
    }
    static fetchOne(id) {
        return db.query(`SELECT * FROM "CicloEscolar" WHERE "idCicloEscolar" = $1::text;`, [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        }
        else {
            return this.fetchAll();
        }
    }
}