const Sequelize = require('sequelize');
const Cliente = require('./Cliente');
const db = require('./db');

const NFVenda = db.define('nfvenda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpfCliente: {
        type: Sequelize.STRING,
        references: {
            model: 'clientes',
            key: 'cpf',
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
NFVenda.sync();
//Atualiza tabela

module.exports = NFVenda;
