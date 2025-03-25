const Pool = require('pg-pool');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "",
    database: "ximenaperezescalante",
}); 


module.exports = pool.connect(); 