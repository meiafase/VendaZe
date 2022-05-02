const Sequelize = require('sequelize');
const db = require('./db');

const ItemCompra = db.define('itemcompra', {
    idItemCompra: {
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
    idNFCompra: {
        type: Sequelize.INTEGER,
        references: {
            model: 'nfcompras',
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
ItemCompra.sync();
//Atualiza tabela

module.exports = ItemCompra;
 