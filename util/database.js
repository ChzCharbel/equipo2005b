const Pool = require("pg-pool");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5433",
    password: "",
    database: "anapaolahernandez",
}); 


module.exports = pool;
