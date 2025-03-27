const db = require('../util/database');
const Pool = require('pg-pool');
const {getAllCourses} = require('../util/admin.api.client');

const pool = new Pool();

module.exports = class Materia{
    static async getAllCourses() {
        return await getAllCourses();
    }
}

