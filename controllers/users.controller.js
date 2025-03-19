exports.get_login = (request, response, next) => {
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
    });
};

exports.post_login = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.username = request.body.username;
    response.redirect('/alumnosregulares');
};

exports.get_logout = (request, respinse, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    })
}