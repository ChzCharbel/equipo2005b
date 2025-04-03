const Profesor = require("../models/profesores.model");

exports.get_all_maestros = (request, response, next) => {
  Profesor.fetchAll()
    .then((profesores) => {
      console.log(profesores.rows);
      request.session.profesores = profesores.rows;
      response.render("profesores.ejs", {
        titulo: "Maestros",
        privilegios: request.session.privilegios || [],
        profesores: request.session.profesores || [],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
