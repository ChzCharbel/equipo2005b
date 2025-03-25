const Usuario = require('../models/users.model');

exports.get_login = (request, response, next) => {
    /* Usuario.getUserById(100007).then((req, res) => {
        console.log(res);
    } 
    )*/
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
    });
};

exports.post_login = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.username = request.body.username;
    response.redirect('/alumnos');
};

exports.get_logout = (request, response, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    })
}