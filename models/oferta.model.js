const db = require('../util/database');

module.exports = class OfertaAcademica {
    constructor(mi_id_ciclo, mi_id_materia) {
        this.idCiclo = mi_id_ciclo;
        this.idMateria = mi_id_materia;
    }
}