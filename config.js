const Pool = require('pg').Pool;

const DB = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bh_task',
    password: '',
    port: 5432
})

const port = 5000;

module.exports = {
    port,
    DB
}