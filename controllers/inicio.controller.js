exports.get_inicio = (request, response, next) => {
    console.log('CICLO ESCOLAR RUTA: ' + request.params.idCiclo);
    response.render('inicio.ejs', {
        titulo: 'inicio',
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || '',
        username: request.session.username || '',
        mail: request.session.mail || '',
    });
};