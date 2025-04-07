const Usuario = require('../models/users.model');
const Alumnos = require('../models/alumnos.model');
const CicloEscolar = require('../models/ciclos.model');
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
    let userType = '';
    
    getUserById(request.body.matriculaInput).then((usuarioAPI) => {
        console.log(usuarioAPI.data);
        rolIVD = usuarioAPI.data.role.name;
        if (rolIVD == 'admin') {
            userType = 'Users::Administrator';
        }
        else if (rolIVD == 'student') {
            userType = 'Users::Student';
        }
        Usuario.getAtributos(userType, request.body.matriculaInput).then((arreglo) => {
            console.log(arreglo);
            const usuario = new 
            Usuario(request.body.matriculaInput, arreglo[1], request.body.passwordInput, arreglo[2], arreglo[0], arreglo[3]);
            usuario.save().then(() => {
                request.session.info = `Tu usuario se ha creado`;
                response.redirect('/users/login');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        response.send('¡Oops! Parece que los datos son incorrectos');
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
        carrera: request.session.carrera || '',
        username: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
  const { matriculaInput, passwordInput } = request.body;
  console.log(matriculaInput, passwordInput);

  Usuario.fetchOne(matriculaInput)
    .then(usuario => {
      if (usuario.rows.length === 0) {
        request.session.warning = 'Usuario y/o contraseña incorrectos';
        return response.redirect('/users/login');
      }

      const userData = usuario.rows[0];
      return require('bcryptjs').compare(passwordInput, userData.password)
        .then(doMatch => {
          if (!doMatch) {
            request.session.warning = 'Usuario y/o contraseña incorrectos';
            return response.redirect('/users/login');
          }

          request.session.privilegios = [];
          request.session.isLoggedIn = true;
          request.session.matricula = matriculaInput;
          request.session.user_id = userData.idIVD;
          request.session.username = userData.nombreUsuario;
          request.session.mail = userData.correoInstitucional;
          request.session.rol = userData.rol;

          return Usuario.getPrivilegios(userData.idIVD)
            .then(privilegios => {
              request.session.privilegios = privilegios.rows;

              return Alumnos.fetchOne(matriculaInput)
                .then(alumnoResult => {
                  if (alumnoResult.rows.length > 0) {
                    const alumno = alumnoResult.rows[0];
                    request.session.carrera = alumno.carrera;
                    request.session.semestre = alumno.semestre;
                    request.session.regular = alumno.regular;
                    console.log('Carrera del alumno:', alumno.carrera);
                  } else {
                    request.session.carrera = 'No definida';
                    console.log('Alumno no encontrado');
                  }

                  return request.session.save(error => {
                    if (error) console.error('Error guardando sesión:', error);

                    return CicloEscolar.fetchAll()
                      .then(ciclos => {
                        request.session.ciclosEscolares = ciclos.rows;
                        if (userData.rol === 'admin') {
                          return response.redirect('/inicio/' + ciclos.rows[0].idCicloEscolar);
                        } else {
                          request.session.cicloActual = ciclos.rows[ciclos.rows.length - 1].idCicloEscolar;
                          return response.redirect('/enlista/alumno');
                        }
                      });
                  });
                });
            });
        });
    })
    .catch(error => {
      console.error('Error general en login:', error);
      response.status(500).send('Error interno del servidor');
    });
};

exports.get_logout = (request, response, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    })
}