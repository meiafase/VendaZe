
var condicao = 3;
var soma = 30;
var data = new Date();

for(var numero = 1; numero <= condicao; numero++){
    data.setDate(data.getDate() + 1);
    console.log(data);

    soma = soma + 30;
}