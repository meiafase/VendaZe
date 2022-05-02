const Sequelize = require('sequelize');
const db = require('./db');

const Estoque = db.define('estoque', {
    idEstoque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idItemCompra: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'itemcompras',
            key: 'idItemCompra',
        }
    },
    idItemVenda: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'itemvendas',
            key: 'idItemVenda',
        }
    },
    descricaoProduto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoMovimentacao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
Estoque.sync();
//Atualiza tabela

module.exports = Estoque;
 