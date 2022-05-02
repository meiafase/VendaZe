const Sequelize = require('sequelize');
const db = require('./db');

const ItemVenda = db.define('itemvenda', {
    idItemVenda: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idProduto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'produtos',
            key: 'id',
        }
    },
    descricaoProduto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idNFVenda: {
        type: Sequelize.INTEGER,
        references: {
            model: 'nfvendas',
            key: 'id',
        }
    },
    sku: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valorUnitario: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    validade: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
ItemVenda.sync();
//Atualiza tabela

module.exports = ItemVenda;
 