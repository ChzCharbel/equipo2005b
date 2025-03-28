


exports.get_all_maestros = (request, response, next) => {
    response.render('profesores.ejs', {
        titulo: 'maestros',
        privilegios: request.session.privilegios || [],
    });
};