const Sequelize = require('sequelize');
const db = require('./db');

const Baixa = db.define('baixa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idParcela: {
        type: Sequelize.INTEGER,
        references: {
            model: 'parcelas',
            key: 'id',
        }
    },
    dataBaixa: {
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
    formaPagamento:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
Baixa.sync();
//Atualiza tabela

module.exports = Baixa;
 