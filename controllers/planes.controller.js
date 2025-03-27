exports.get_planes = (request, response, next) => {
    response.render('plan.ejs', {
        titulo: 'plan',
    });
};