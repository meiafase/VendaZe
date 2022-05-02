const Sequelize = require('sequelize');
const db = require('./db');

const NFCompra = db.define('nfcompra', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cnpjFornecedor: {
        type: Sequelize.STRING,
        references: {
            model: 'fornecedors',
            key: 'cnpj',
        }
    },
    dataEmissao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
NFCompra.sync();
//Atualiza tabela

module.exports = NFCompra;
 