const db = require('../util/database'); // conexión con PostgreSQL

const asignarProfesorYSalon = async (idGrupo, matriculaProfesor, idSalon) => {
    const query = 'UPDATE Grupo SET matriculaProfesor = $1, idSalon = $2 WHERE idGrupo = $3';
    const values = [matriculaProfesor, idSalon, idGrupo];
    return db.query(query, values);
};

module.exports = {
    asignarProfesorYSalon,
};
