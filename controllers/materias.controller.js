const Materia = require('../models/materias.model');

exports.get_materias = (request, response, next) => {
    Materia.fetchAll().then(materias => {
        console.log(materias.rows);
        response.render('materias.ejs', {
        ruta: 'materias',
        materias: materias.rows || [],
        });
    });
    
}