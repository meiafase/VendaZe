const express =  require('express');
const app = express();
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');
const Fornecedor = require('../models/Fornecedor');
const ItemCompra = require('../models/ItemCompra');
const NFCompra = require('../models/NFCompra');
const NFVenda = require('../models/NFVenda');
const ItemVenda = require('../models/ItemVenda');
const Estoque = require('../models/Estoque');

const sequelize = require('../models/db.js');



app.use(express.json());

// APP - Produto <-----
// APP - Produto <-----
// APP - Produto <-----

app.get("/listarProdutos", async (req, res) => {
    const produtos = await Produto.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(produtos);
});

app.post("/cadastrarProduto", async (req, res) => {
    console.log(req.body);
    await Produto.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto cadastrado com sucesso!"
        });
    });
});

app.put("/atualizar/:id", async (req, res) => {
    await Produto.update(req.body, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Produto atualizado com sucesso!");
    });
});

app.delete("/deletar/:id", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Produto.update({ inativo: 0 }, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Produto deletado com sucesso!");
    });
    
});

// APP - Cliente <-----
// APP - Cliente <-----
// APP - Cliente <-----

app.get("/listarCliente", async (req, res) => {
    const clientes = await Cliente.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(clientes);
});

app.post("/cadastrarCliente", async (req, res) => {
    console.log(req.body);
    await Cliente.create(req.body)
    .then(() => {
        res.send("Cliente cadastrado com sucesso!");
    });
});

app.put("/atualizarCliente/:cpf", async (req, res) => {
    console.log("Atualizar ------------");
    await Cliente.update(req.body, {
        where : {
            cpf: req.params.cpf
        }
    })
    .then(() => {
        res.send("Cliente atualizado com sucesso!");
    });
});

app.delete("/deletarCliente/:cpf", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Cliente.update({ inativo: 0 }, {
        where : {
            cpf: req.params.cpf
        }
    })
    .then(() => {
        res.send("Cliente deletado com sucesso!");
    });
    
});

// APP - Fornecedor <-----
// APP - Fornecedor <-----
// APP - Fornecedor <-----

app.get("/listarFornecedores", async (req, res) => {
    const fornecedores = await Fornecedor.findAll({
        where: {
            inativo: 1
        }
    });
    return res.send(fornecedores);
});

app.post("/cadastrarFornecedor", async (req, res) => {
    console.log(req.body);
    await Fornecedor.create(req.body)
    .then(() => {
        res.send("Fornecedor cadastrado com sucesso!");
    });
});

app.put("/atualizarFornecedor/:cnpj", async (req, res) => {
    console.log("Atualizar ------------");
    await Fornecedor.update(req.body, {
        where : {
            cnpj: req.params.cnpj
        }
    })
    .then(() => {
        res.send("Fornecedor atualizado com sucesso!");
    });
});

app.delete("/deletarFornecedor/:cnpj", async (req, res) =>{
    console.log("Atualizar inativo ------------");
    await Fornecedor.update({ inativo: 0 }, {
        where : {
            cnpj: req.params.cnpj
        }
    })
    .then(() => {
        res.send("Fornecedor deletado com sucesso!");
    });
    
});

// APP - Item Compra <-----
// APP - Item Compra <-----
// APP - Item Compra <-----


app.get("/listarItemCompra", async (req, res) => {
    const itemcompra = await ItemCompra.findAll({
        order: [
            ['idItemCompra', 'DESC']
        ],
    });
    
    return res.send(itemcompra);
});
app.post("/cadastrarItemCompra", async (req, res) => {

    await ItemCompra.create(req.body)
    .then(() => {
        res.send("Item Compra cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! item Compra NÂO cadastrada");
    });

    const itemcompra = await ItemCompra.findAll({
        attributes: [
            'idItemCompra', 'descricaoProduto',
        ],
        order: [
            ['idItemCompra', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });
    const idItemCompra = itemcompra[0].idItemCompra;
    const descricaoProduto = itemcompra[0].descricaoProduto;
    const tipoMovimentacao = "E";

    await Estoque.create({idItemCompra, descricaoProduto, tipoMovimentacao})
    .then(() => {
        console.log("Estoque cadastrado");
    }).catch(() => {
        res.send("ERRO! Estoque");
    });
});

// APP - Item Venda <-----
// APP - Item Venda <-----
// APP - Item Venda <-----


app.get("/listarItemVenda", async (req, res) => {
    const itemvenda = await ItemVenda.findAll();
    return res.send(itemvenda);
});

app.post("/cadastrarItemVenda", async (req, res) => {
    console.log(req.body);
    await ItemVenda.create(req.body)
    .then(() => {
        res.send("Item Venda cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! item venda NÂO cadastrada")
    });

    const itemvenda = await ItemVenda.findAll({
        attributes: [
            'idItemVenda', 'descricaoProduto',
        ],
        order: [
            ['idItemVenda', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });
    const idItemVenda = itemvenda[0].idItemVenda;
    const descricaoProduto = itemvenda[0].descricaoProduto;
    const tipoMovimentacao = "S";

    await Estoque.create({idItemVenda, descricaoProduto, tipoMovimentacao})
    .then(() => {
        console.log("Estoque cadastrado");
    }).catch(() => {
        res.send("ERRO! Estoque");
    });
});

// APP - NF Compra <-----
// APP - NF Compra <-----
// APP - NF Compra <-----

app.get("/listarNFCompra", async (req, res) => {
    const nfCompra = await NFCompra.findAll();
    return res.send(nfCompra);
});

app.post("/cadastrarNFCompra", async (req, res) => {
    console.log(req.body);
    await NFCompra.create(req.body)
    .then(() => {
        res.send("NF cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! NF NÂO cadastrada")
    });
});

// APP - NF Venda <-----
// APP - NF Venda <-----
// APP - NF Venda <-----


app.get("/listarNFVenda", async (req, res) => {
    const nfVendas = await NFVenda.findAll();
    return res.send(nfVendas);
});

app.post("/cadastrarNFVenda", async (req, res) => {
    console.log(req.body);
    await NFVenda.create(req.body)
    .then(() => {
        res.send("NF cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! NF NÂO cadastrada")
    });
});

// APP - Estoque <-----
// APP - Estoque <-----
// APP - Estoque <-----

app.get("/listarEstoqueSaida", async (req, res) => {
    const estoque = await Estoque.findAll({
        attributes: [
            'idEstoque', 'descricaoProduto', 'idItemVenda','tipoMovimentacao','createdAt'
        ],
        where: {
            tipoMovimentacao: "S"
        }
    });
    return res.send(estoque);
});

app.get("/listarEstoqueEntrada", async (req, res) => {
    const estoque = await Estoque.findAll({
        attributes: [
            'idEstoque', 'descricaoProduto', 'idItemCompra','tipoMovimentacao','createdAt'
        ],
        where: {
            tipoMovimentacao: "E"
        }
    });
    return res.send(estoque);
});

app.get("/listarQuantidadeEstoque", async (req, res) => {
    const estoque = await Estoque.findAll({
	
        attributes: ['descricaoProduto', [sequelize.fn('count', sequelize.col('descricaoProduto')), 'Total em Estoque']],
	
        group : ['descricaoProduto']
      });
    return res.send(estoque);
});

app.listen(8080, () => {
    console.log("Servidor rodando!");
});
