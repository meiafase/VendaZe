const Sequelize = require('sequelize');
const db = require('./db');

const Cliente = db.define('cliente', {
    cpf: {
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
Cliente.sync();
//Atualiza tabela

module.exports = Cliente;
