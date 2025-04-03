exports.get_planes = (request, response, next) => {
    response.render('plan.ejs', {
        titulo: 'planes',
        privilegios: request.session.privilegios || [],
        ciclosEscolares: request.session.ciclosEscolares || [],
    });
};