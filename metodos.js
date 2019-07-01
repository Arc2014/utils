const apagarBancosSemBranch = require('./apagarBDFeatures');
const dropDatabases = require('./dropDatabases');

const chamarFuncao = (nomeDaFuncao) => {
    switch (nomeDaFuncao) {
        case 'apagarBancosSemBranch':
            apagarBancosSemBranch.do(process.argv);
            break;
        case 'dropDatabases':
            dropDatabases.do(process.argv);
            break;
        default:
            console.log('Nenhuma função informada');
            break;
    }
};

exports.do = chamarFuncao;