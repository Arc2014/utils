const pgtools = require('pgtools');
const {Pool} = require('pg');
const prefix = "'calima_%'";
const ignoreDbs = ["'postgres'", "'calima'", "'calima_testes'", "'calima_qa'"];
var config = {
    user: 'postgres',
    password: 'masterkey',
    port: 5432,
    host: 'localhost',
    database: 'postgres'
};

const pool = new Pool(config);

const dropDatabases = () => {
    getDbnames().then((dbs) => {
        dbs.map((db) => {
            pgtools.dropdb(config, db.dbname, function (err) {
                if (err) {
                    console.error(db.dbname,'>>>>ERRO<<<<<',  err);
                } else {
                    console.log(db.dbname, ' >>>>DELETADO<<<< ');
                }
            });
        });
    }, (err) => {
        console.log(err);
    });
};

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

dropDatabases();