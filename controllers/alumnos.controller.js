exports.get_horario_alumnos_regulares = (request, response, next) => {
    response.render('horario_alumnos_regulares.ejs', {
        titulo: 'alumnos_regulares',
        privilegios: request.session.privilegios || [],
    });
};

exports.get_alumnos = (request, response, next) => {
    console.log(request.session.matricula);
    console.log(request.session.privilegios);
    response.render('alumnos', {
        titulo: 'alumnos',
        privilegios: request.session.privilegios || [],
    });
}; 

exports.get_horario_alumnos_irregulares = (request, response, next) => {
    response.render('horario_alumnos_irregulares.ejs', {
        titulo: 'alumnos_irregulares',
        privilegios: request.session.privilegios || [],
    });
};