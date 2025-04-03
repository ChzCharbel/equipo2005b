exports.get_inicio = (request, response, next) => {
    response.render('inicio.ejs', {
        titulo: 'inicio',
        privilegios: request.session.privilegios || [],
        ciclosEscolares: request.session.ciclosEscolares || [],
    });
};