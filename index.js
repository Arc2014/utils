const pgtools = require('pgtools');
const {Pool} = require('pg');
const prefix = "'calima_%'";
const ignoreDbs = ["'postgres'", "'calima'", "'calima_testes'", "'calima_qa'"];
const path = require('path');
const dirpath = path.resolve(__dirname,'.env');
require('dotenv').config({ path: dirpath });
const metodos = require('./metodos');

var db_config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    host: 'localhost',
    database: 'postgres'
};

const pool = new Pool(db_config);

const getDbnames = () => {
    return new Promise( (resolve, reject) => {
        const query = `SELECT datname as dbname FROM pg_database 
                        WHERE datistemplate = false
                            AND datname like ${prefix}
                            AND datname NOT IN (${ignoreDbs})`;
        pool.query(query, (err, resp) => {
            pool.end();
            if(err) {
                reject(Error(err));
            } else {
                resolve(resp.rows);
            }
        });
    });
};

exports.getDbnames = getDbnames;
exports.dirpath = dirpath;
exports.db_config = db_config;

metodos.do(process.argv[2]);