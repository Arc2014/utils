const index = require('./index');
const pgtools = require('pgtools');
require('dotenv').config({ path: index.dirpath });

const dropDatabases = (...args) => {
    index.getDbnames().then((dbs) => {
        dbs.map((db) => {
            pgtools.dropdb(index.db_config, db.dbname, function (err) {
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

exports.do = dropDatabases;