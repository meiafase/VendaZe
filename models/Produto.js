const Sequelize = require('sequelize');
const db = require('./db');

const Produto = db.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // preco: {
    //     type: Sequelize.DOUBLE,
    //     allowNull: false
    // },
    // sku: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    // validade: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    inativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
//Criar table
Produto.sync();
//Atualiza tabela

module.exports = Produto;
