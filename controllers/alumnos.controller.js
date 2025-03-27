exports.get_horario_alumnos_regulares = (request, response, next) => {
    response.render('horario_alumnos_regulares.ejs', {
        ruta: 'alumnos_regulares',
        privilegios: request.session.privilegios || [],
    });
};

exports.get_alumnos = (request, response, next) => {
    console.log(request.session.matricula);
    console.log(request.session.privilegios);
    response.render('alumnos', {
        ruta: 'alumnos',
        privilegios: request.session.privilegios || [],
    });
}; 

exports.get_horario_alumnos_irregulares = (request, response, next) => {
    response.render('horario_alumnos_irregulares.ejs', {
        ruta: 'alumnos_irregulares',
        privilegios: request.session.privilegios || [],
    });
};