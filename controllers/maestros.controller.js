


exports.get_all_maestros = (request, response, next) => {
    response.render('profesores.ejs', {
        ruta: 'maestros'
    });
};