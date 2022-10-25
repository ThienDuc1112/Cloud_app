const Pool = require('pg').Pool

const pg_conn = new Pool({
    user: 'yowptwrgtpantb',
    host: 'ec2-52-200-5-135.compute-1.amazonaws.com',
    database: 'df5glehr8olfah',
    password: '2864326b6a8bcf99f8f5dda2deb2630ef6d85d43c86679bb319c0fe1413fa1a2',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = pg_conn;