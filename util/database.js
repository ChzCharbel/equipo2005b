const Pool = require("pg-pool");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "9324b11ddB.",
  database: "ximenaperezescalante",
});

module.exports = pool;
