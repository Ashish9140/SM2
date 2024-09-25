const { Pool } = require('pg');

// Get connection details from environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export the pool object for querying
module.exports = {
    query: (text, params) => pool.query(text, params),
};
