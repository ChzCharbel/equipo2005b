const Grupo = require('../models/grupos.model');
const { getAllCourses } = require('../util/admin.api.client');
const db = require('../util/database'); 

exports.get_grupos = (request, response, next) => {
    Grupo.getAllCourses().then(materias => {
        console.log(materias);
        response.render('grupos.ejs', {
        ruta: 'grupos',
        materias: materias || [],
        });
    });
}

exports.editarGrupo = (request, response, next) => {
    let idGrupo = request.params.id;
    let { idMateria, matriculaProfesor, idSalon, Lunes, Martes, Miercoles, Jueves, Viernes } = request.body;

    let query = `UPDATE grupo SET idMateria=?, matriculaProfesor=?, idSalon=?, Lunes=?, Martes=?, Miercoles=?, Jueves=?, Viernes=? WHERE idGrupo=?`;

    db.query(query, [idMateria, matriculaProfesor, idSalon, Lunes, Martes, Miercoles, Jueves, Viernes, idGrupo], (err, result) => {
        if (err) return response.json({ success: false, error: err });
        response.json({ success: true });
    });
};

