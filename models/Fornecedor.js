const Sequelize = require('sequelize');
const db = require('./db');

const Fornecedor = db.define('fornecedor', {
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
//Criar table
//Produto.sync({ alter: true });
Fornecedor.sync();
//Atualiza tabela

module.exports = Fornecedor;
