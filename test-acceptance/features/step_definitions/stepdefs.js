const assert = require("assert");
const { Given, When, Then } = require("cucumber");

Given("O usuário {string} não possui uma lista criada", function(usuario) {
    //criar esse ambiente descrito no Given
    return "pending";
});

When("O usuário {string} vai para a página {string}", function(usuario, path) {
    //realizar ação descrita no When
    throw "nada criado ainda";
});

Then("O site imprime a mensagem {string}", function(mensagem) {
    //checar se os resultados do Then estão corretos
    throw "nada criado ainda";
});