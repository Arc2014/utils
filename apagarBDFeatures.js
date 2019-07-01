const index = require('./index');
const fs = require('fs');
require('dotenv').config({ path: index.dirpath });

const listarArquivos = async (diretorio) => {
    return await new Promise ( (resolve, reject) => {
                fs.readdir(diretorio, function(err, files) {
                    if (err) {
                        reject(Error('Unable to scan directory: ' + err));
                    }
                    let arquivos = [];
                    files.forEach(function (file) {
                        arquivos = [...arquivos, file];
                    });
                    resolve(arquivos);
                });
            });
};

const apagarBancosSemBranch = async (...args) => {
    var listaBranches = await listarArquivos(process.env.UTILS_PATH_TO_PROJECT);
    console.log(listaBranches);
}
exports.do = apagarBancosSemBranch;

/*index.getDbnames().then( dblist => {
    dblist.forEach(db => console.log(db.dbname));
}, err => {console.log(err);});*/