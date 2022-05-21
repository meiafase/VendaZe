const Sequelize = require('sequelize');
const db = require('./db');

const Parcelas = db.define('parcela', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idTitulo: {
        type: Sequelize.INTEGER,
        references: {
            model: 'contaspagars',
            key: 'id',
        }
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    juros: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    multa: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    liquido: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
Parcelas.sync();
//Atualiza tabela

module.exports = Parcelas;
 