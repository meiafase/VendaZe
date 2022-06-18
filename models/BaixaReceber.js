const Sequelize = require('sequelize');
const db = require('./db');

const BaixaReceber = db.define('baixaRecebers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idParcela: {
        type: Sequelize.INTEGER,
        references: {
            model: 'parcelarecebers',
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
    deletadoEm: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    formaPagamento:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cliente.HasOne(NFVenda);
//Criar table
//Produto.sync({ alter: true });
BaixaReceber.sync();
//Atualiza tabela

module.exports = BaixaReceber;
 