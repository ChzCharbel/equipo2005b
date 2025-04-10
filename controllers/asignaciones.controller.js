const { asignarProfesorYSalon } = require('../models/materia.db.model');

const asignarProfesorSalon = async (req, res) => {
    const { idMateria, profesor, salon } = req.body; // idMateria en el frontend realmente es idGrupo

    try {
        await asignarProfesorYSalon(idMateria, profesor, salon); // ahora idMateria = idGrupo
        res.redirect('/oferta_academica');
    } catch (error) {
        console.error('Error al asignar profesor y salón:', error);
        res.status(500).send('Error en la asignación');
    }
};

module.exports = {
    asignarProfesorSalon,
};