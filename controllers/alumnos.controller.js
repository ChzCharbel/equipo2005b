exports.get_horario_alumnos_regulares = (request, response, next) => {
    response.render('horario_alumnos_regulares.ejs', {
        ruta: 'alumnos_regulares'
    });
};

exports.get_alumnos = (request, response, next) => {
    response.render('alumnos', {
        ruta: 'alumnos'
    });
}; 

exports.get_horario_alumnos_irregulares = (request, response, next) => {
    response.render('horario_alumnos_irregulares.ejs', {
        ruta: 'alumnos_irregulares'
    });
};