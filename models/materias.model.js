const db = require("../util/database");
const Pool = require("pg-pool");
const {GetAllCourses} = require("../util/admin.api.client");

const pool = new Pool();

module.exports = class Materias {

    static async actualizarGrupo(nombreProfesor, salonId) {
        const query = `INSERT INTO gruposs(nombre_profesor, salon_id) VALUES($1, $2) RETURNING nombre_profesor, salon_id;`;
        const values = [nombreProfesor, salonId];

        try {
            const result = await pool.query(query, values);
            return { success: true };
        } catch (error) {
            console.error("Error al actualizar el grupo:", error);
            return { success: false, message: "Error al actualizar el grupo en la base de datos." };
        }
    }

    static async getAllCourses() {
        return await getAllCourses();
    }
};
