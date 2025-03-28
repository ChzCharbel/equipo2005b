const Materias = require("../models/materias.model");
const Profesor = require("../models/profesores.model");
const Salon = require("../models/salones.model");
const { getAllCourses } = require("../util/admin.api.client");

exports.get_materias = (request, response, next) => {
    Promise.all([
        getAllCourses(), // Método importado en lugar de Materias.getAllCourses()
        Profesor.fetchAll(),
        Salon.fetchAll()
    ]).then(([materias, profesores, salones]) => {
        response.render("materias.ejs", {
            titulo: "Materias",
            materias: materias || [],
            privilegios: request.session.privilegios || [],
            profesores: profesores.rows || [],
            salones: salones.rows || [],
            csrfToken: request.csrfToken()
        });
    }).catch(error => {
        console.error(error);
        response.status(500).render("error.ejs", {
            titulo: "Error",
            mensaje: "Ocurrió un error al cargar los datos"
        });
    });
};

// Método para guardar o actualizar grupo
exports.save_grupo = (request, response, next) => {
    const { profesor, salon } = request.body;  // Sin grupoId

    // Validar los campos
    if (!profesor || !salon) {
        return response.status(400).json({
            message: 'Todos los campos son obligatorios'
        });
    }

    // Asumiendo que la actualización del grupo se basa en algún identificador diferente
    Materia.updateGroup(profesor, salon) // Actualiza usando solo profesor y salon
        .then(result => {
            response.status(200).json({
                message: 'Grupo actualizado exitosamente',
                grupo: result[0][0] // Asumiendo que el resultado es un array de arrays
            });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                message: 'Error al actualizar el grupo',
                error: error.message
            });
        });
};
