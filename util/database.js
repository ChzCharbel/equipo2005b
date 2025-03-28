const Pool = require('pg-pool');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: "5433",
    password: "1234",
    database: "postgres",
}); 


module.exports = pool; 