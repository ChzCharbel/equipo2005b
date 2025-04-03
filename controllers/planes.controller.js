exports.get_planes = (request, response, next) => {
    response.render('plan.ejs', {
        titulo: 'Plan de Estudios',
        privilegios: request.session.privilegios || [],
    });
};