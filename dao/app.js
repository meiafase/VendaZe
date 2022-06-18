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
const ContasPagar = require('../models/ContasPagar');
const Baixa = require('../models/Baixa');
const BaixaReceber = require('../models/BaixaReceber');
const Parcela = require('../models/Parcela');
const ParcelaReceber = require('../models/ParcelaReceber');
const ContasReceber = require('../models/ContasReceber');
const { Op } = require("sequelize");
const sequelize = require('../models/db.js');
const { status } = require('express/lib/response');



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
            'idItemCompra', 'descricaoProduto', 'valorUnitario',
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

    await Estoque.update({idItemVenda, tipoMovimentacao}, {
        where : {
            [Op.and]: [{ tipoMovimentacao: "E" }, { descricaoProduto }],
        },
        limit: 1
        
    })
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
        where: {
            tipoMovimentacao: "E"
        },
        group : ['descricaoProduto']
      });
    return res.send(estoque);
});


// APP - Contas a Pagar <-----
// APP - Contas a Pagar <-----
// APP - Contas a Pagar <-----

app.post("/gerarContasPagar", async (req, res) => {
    console.log(req.body);
    await ContasPagar.create(req.body)
    .then(() => {
        res.send("Contas a Pagar cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! Contas a pagar NÂO cadastrada")
    });

    const contasPagar = await ContasPagar.findAll({
        attributes: [
            'id',
        ],
        order: [
            ['id', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });

        var condicao = req.body.nParcelas;
        var idTitulo = contasPagar[0].id;
        var vencimento = new Date(req.body.dataEmissao);
        var valorTotal = req.body.valor;
        var valor = valorTotal / condicao;
        var juros = 2;
        var multa = 10;
        var liquido = req.body.valor;
        var status = "Aberto";
        var soma = 30;

        for(var numero = 1; numero <= condicao; numero++){
            vencimento.setDate(vencimento.getDate() + 30);

            await Parcela.create({
                idTitulo, 
                numero, 
                vencimento,
                valor,
                juros,
                multa,
                liquido,
                status
            });

            soma = soma + 30;
        }

});

app.get("/listarContasPagar", async (req, res) => {
    const contasPagar = await ContasPagar.findAll({
        attributes: [
            'id', 'idNFCompra', 'valor','dataEmissao','nParcelas'
        ]
    });
    return res.send(contasPagar);
});


// APP - Parcela <-----
// APP - Parcela <-----
// APP - Parcela <-----


app.get("/listarParcelas", async (req, res) => {
    const parcela = await Parcela.findAll({
        attributes: [
            'id', 'idTitulo', 'numero','Vencimento','status'
        ]
    });

    
    return res.send(parcela);
});

app.post("/baixarParcela", async (req, res) => {

    var idParcela = req.body.idParcela;
    var valorPago = req.body.valor;
    var dataPagamento = new Date(req.body.dataBaixa);
    var formaPagamento = req.body.formaPagamento;

    const parcela = await Parcela.findAll({
        attributes: [
            'id', 'idTitulo', 'numero', 'vencimento', 'valor', 'juros', 'multa', 'status'
        ],
        where: {
            id: idParcela
        }
    });

    var idTitulo = parcela[0].id;
    var valorTitulo = parcela[0].valor;
    var vencimento = new Date(parcela[0].vencimento);
    var juros = parcela[0].juros;
    var multa = parcela[0].multa;

    var resultado = vencimento - dataPagamento;

    var contMulta = (resultado / 1000 / 60 / 60 / 24) * (-1);

    console.log(contMulta.toFixed(0) + "<--------------------------");

     if(contMulta.toFixed(0) <= 0){
         if(valorPago < valorTitulo){
             var valor = valorTitulo - valorPago;
             await Parcela.update({valor}, {
                 where : {
                     id: idTitulo
                 }
             })
             .then(() => {
                 res.send("Parcela parcialmente Baixada!");
             });
         }else{
             var status = "Liquidado";
             console.log("------------->  " + valorTitulo);
             var valor = valorTitulo;
             await Parcela.update({valor, status}, {
                 where : {
                     id: idTitulo
                 }
             })
             .then(() => {
                 res.send("Parcela Baixada!");
             });
                var dataBaixa = dataPagamento
                var juros = 0;
                var multa = 0;
                await Baixa.create({idParcela, dataBaixa, valor, juros, multa, formaPagamento});
        }

     }else{
        if(valorPago < valorTitulo){
            var valor = valorTitulo - valorPago;
            var juros = juros * contMulta.toFixed(0);
            var valor = valor + juros + multa;

            await Parcela.update({valor}, {
                where : {
                    id: idTitulo
                }
            })
            .then(() => {
                res.send("Parcela parcialmente Baixada! (Atraso)");
            });
        }else{
            var status = "Liquidado";
            var valor = valorTitulo;
            await Parcela.update({status}, {
                where : {
                    id: idTitulo
                }
            })
            .then(() => {
                res.send("Parcela Baixada! (Atraso)");
            });
               var dataBaixa = dataPagamento;
               await Baixa.create({idParcela, dataBaixa, valor, juros, multa, formaPagamento});
       }
     }
});

app.get("/listarBaixas", async (req, res) => {
    const baixas = await Baixa.findAll({
        attributes: [
            'id', 'idParcela', 'valor','juros','multa', 'formaPagamento'
        ],
        where: {
            deletadoEm: null
        }
    });

    if(baixas == ""){
        return res.send("Sem baixas disponíveis!");
    }else{
        return res.send(baixas);
    }
});


app.delete("/deletarBaixa/:id", async (req, res) => {

    var deletadoEm = new Date();

    await Baixa.update({deletadoEm}, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Baixa deletada com sucesso!");
    });

    const baixas = await Baixa.findAll({
        attributes: [
            'id', 'idParcela', 'valor','juros','multa', 'formaPagamento'
        ],
        where: {
            id: req.params.id
        }
    });
    var idParcela = baixas[0].idParcela;

    const parcela = await Parcela.findAll({
        attributes: [
            'id', 'idTitulo', 'numero', 'vencimento', 'valor', 'juros', 'multa', 'status'
        ],
        where: {
            id: idParcela
        }
    });

    var id = parcela[0].id;

    var status = "Aberto";
    await Parcela.update({status}, {
        where : {
            id: id
        }
    });
});


app.get("/listarContasReceber", async (req, res) => {
    const contasReceber = await ContasReceber.findAll({
        attributes: [
            'id', 'idNFVenda', 'valor','dataEmissao','nParcelas'
        ]
    });
    return res.send(contasReceber);
});


app.post("/gerarContasReceber", async (req, res) => {
    await ContasReceber.create(req.body)
    .then(() => {
        res.send("Contas a Pagar cadastrada com sucesso!");
    }).catch(() => {
        res.send("ERRO! Contas a pagar NÂO cadastrada")
    });

    const contasReceber = await ContasReceber.findAll({
        attributes: [
            'id',
        ],
        order: [
            ['id', 'DESC'],
        ],
        raw: true,
        limit: 1,
    });

        var condicao = req.body.nParcelas;
        var idTitulo = contasReceber[0].id;
        var vencimento = new Date(req.body.dataEmissao);
        var valorTotal = req.body.valor;
        var valor = valorTotal / condicao;
        var juros = 2;
        var multa = 10;
        var liquido = req.body.valor;
        var status = "Aberto";
        var soma = 30;

        for(var numero = 1; numero <= condicao; numero++){
            vencimento.setDate(vencimento.getDate() + 30);

            await ParcelaReceber.create({
                idTitulo, 
                numero, 
                vencimento,
                valor,
                juros,
                multa,
                liquido,
                status
            });

            soma = soma + 30;
        }

});


app.get("/listarParcelasReceber", async (req, res) => {
    const parcelaReceber = await ParcelaReceber.findAll({
        attributes: [
            'id', 'idTitulo', 'numero','Vencimento','status'
        ]
    });

    
    return res.send(parcelaReceber);
});

app.post("/baixarParcelaReceber", async (req, res) => {

    var idParcela = req.body.idParcela;
    var valorPago = req.body.valor;
    var dataPagamento = new Date(req.body.dataBaixa);
    var formaPagamento = req.body.formaPagamento;

    const parcelaReceber = await ParcelaReceber.findAll({
        attributes: [
            'id', 'idTitulo', 'numero', 'vencimento', 'valor', 'juros', 'multa', 'status'
        ],
        where: {
            id: idParcela
        }
    });

    var idTitulo = parcelaReceber[0].id;
    var valorTitulo = parcelaReceber[0].valor;
    var vencimento = new Date(parcelaReceber[0].vencimento);
    var juros = parcelaReceber[0].juros;
    var multa = parcelaReceber[0].multa;

    var resultado = vencimento - dataPagamento;

    var contMulta = (resultado / 1000 / 60 / 60 / 24) * (-1);

    console.log(contMulta.toFixed(0) + "<--------------------------");

     if(contMulta.toFixed(0) <= 0){
         if(valorPago < valorTitulo){
             var valor = valorTitulo - valorPago;
             await ParcelaReceber.update({valor}, {
                 where : {
                     id: idTitulo
                 }
             })
             .then(() => {
                 res.send("Parcela parcialmente Baixada!");
             });
         }else{
             var status = "Liquidado";
             console.log("------------->  " + valorTitulo);
             var valor = valorTitulo;
             await ParcelaReceber.update({valor, status}, {
                 where : {
                     id: idTitulo
                 }
             })
             .then(() => {
                 res.send("Parcela Baixada!");
             });
                var dataBaixa = dataPagamento
                var juros = 0;
                var multa = 0;
                await BaixaReceber.create({idParcela, dataBaixa, valor, juros, multa, formaPagamento});
        }

     }else{
        if(valorPago < valorTitulo){
            var valor = valorTitulo - valorPago;
            var juros = juros * contMulta.toFixed(0);
            var valor = valor + juros + multa;

            await ParcelaReceber.update({valor}, {
                where : {
                    id: idTitulo
                }
            })
            .then(() => {
                res.send("Parcela parcialmente Baixada! (Atraso)");
            });
        }else{
            var status = "Liquidado";
            var valor = valorTitulo;
            await ParcelaReceber.update({status}, {
                where : {
                    id: idTitulo
                }
            })
            .then(() => {
                res.send("Parcela Baixada! (Atraso)");
            });
               var dataBaixa = dataPagamento;
               await BaixaReceber.create({idParcela, dataBaixa, valor, juros, multa, formaPagamento});
       }
     }
});


app.delete("/deletarBaixaReceber/:id", async (req, res) => {

    var deletadoEm = new Date();

    await BaixaReceber.update({deletadoEm}, {
        where : {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Baixa deletada com sucesso!");
    });

    const baixaRecebers = await BaixaReceber.findAll({
        attributes: [
            'id', 'idParcela', 'valor','juros','multa', 'formaPagamento'
        ],
        where: {
            id: req.params.id
        }
    });
    var idParcela = baixaRecebers[0].idParcela;

    const parcelaReceber = await ParcelaReceber.findAll({
        attributes: [
            'id', 'idTitulo', 'numero', 'vencimento', 'valor', 'juros', 'multa', 'status'
        ],
        where: {
            id: idParcela
        }
    });

    var id = parcelaReceber[0].id;

    var status = "Aberto";
    await ParcelaReceber.update({status}, {
        where : {
            id: id
        }
    });
});



app.get("/listarBaixasReceber", async (req, res) => {
    const baixasReceber = await BaixaReceber.findAll({
        attributes: [
            'id', 'idParcela', 'valor','juros','multa', 'formaPagamento'
        ],
        where: {
            deletadoEm: null
        }
    });

    if(baixasReceber == ""){
        return res.send("Sem baixas disponíveis!");
    }else{
        return res.send(baixasReceber);
    }
});


app.listen(8080, () => {
    console.log("Servidor rodando!");
});
