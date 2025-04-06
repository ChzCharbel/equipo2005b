const Pool = require("pg-pool");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "1234",
    database: "prueba",
}); 


module.exports = pool;
