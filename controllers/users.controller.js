const Usuario = require('../models/users.model');
const {getUserById, getUserGroups, getAcademicHistory} = require('../util/admin.api.client');

exports.get_reset_password = (request, response, next) => {
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
        matricula: request.session.matricula || '',
        isNew: true,
        csrfToken: request.csrfToken(),
        privilegios: request.session.privilegios || [],
    })
}

exports.post_reset_password= (request, response, next) => {
    console.log(request.body.matriculaInput);
    let rolIVD = '';
    let userIVD = '';
    getUserById(request.body.matriculaInput).then((usuarioAPI) => {
        console.log(usuarioAPI.data);
        rolIVD = usuarioAPI.data.role.name;
        const nombre = usuarioAPI.data.name + ' ' + usuarioAPI.data.first_surname + ' ' + usuarioAPI.data.second_surname;
        userIVD = nombre;
        const usuario = new 
        Usuario(request.body.matriculaInput, request.body.emailInput, request.body.passwordInput, rolIVD, userIVD);
        usuario.save().then(() => {
            request.session.info = `Tu usuario se ha creado`;
            response.redirect('/users/login');
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        response.send('Oops! Parece que los datos son incorrectos');
        console.log(error);
    });
};

exports.get_login = (request, response, next) => {
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
        matricula: request.session.matricula || '',
        isNew: false,
        csrfToken: request.csrfToken(),
        privilegios: request.session.privilegios || [],
    });
};

exports.post_login = (request, response, next) => {
    console.log(request.body.matriculaInput);
    console.log(request.body.passwordInput);
    Usuario.fetchOne(request.body.matriculaInput).then((usuario) => {
        console.log(usuario.rows);
        if(usuario.rows.length > 0) {
            const bcrypt = require('bcryptjs');
            console.log(usuario.rows[0]);
            bcrypt.compare(request.body.passwordInput, usuario.rows[0].password).then((doMatch) => {
                if (doMatch) {
                    Usuario.getPrivilegios(usuario.rows[0].idIVD).then((privilegios) => {
                        request.session.privilegios = privilegios.rows;
                        request.session.isLoggedIn = true;
                        request.session.matricula = request.body.matriculaInput;
                        request.session.user_id = usuario.rows[0].idIVD;
                        return request.session.save((error) => {
                            if (usuario.rows[0].rol == 'admin'){
                                response.redirect('/inicio');
                            }
                            else {
                                response.redirect('/alumnos/regulares');
                            }
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    request.session.warning = `Usuario y/o contraseña incorrectos`;
                    console.log(request.session.warning);
                    response.redirect('/users/login');
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            request.session.warning = `Usuario y/o contraseña incorrectos`;
            response.redirect('/users/login');
        }
    }).catch((error) => {
        console.log(error);
        console.log('nooo');
    });
};

exports.get_logout = (request, response, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    })
}