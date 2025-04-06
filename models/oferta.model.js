const db = require('../util/database');

module.exports = class OfertaAcademica {
    constructor(mi_id_ciclo, mi_id_materia) {
        this.idCiclo = mi_id_ciclo;
        this.idMateria = mi_id_materia;
    }

    static getPlanIds(materias) {
        const planes = [];
        for (let materia of materias) {
            planes.push(materia.plans[0].id);
        }
        return planes;
    }

    static sortByDegree(materias, carrera) {
        const arregloMaterias = [];
        for (let materia of materias) {
            if (materia.plans[0].degree.name == carrera) {
                arregloMaterias.push(materia); 
            } 
        }
        return arregloMaterias;
    }
}