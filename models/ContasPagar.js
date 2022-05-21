const Sequelize = require('sequelize');
const db = require('./db');

const ContasPagar = db.define('contasPagar', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idNFCompra: {
        type: Sequelize.INTEGER,
        references: {
            model: 'nfcompras',
            key: 'id',
        }
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    dataEmissao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    nParcelas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gerada: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
ContasPagar.sync();
//Atualiza tabela

module.exports = ContasPagar;
 