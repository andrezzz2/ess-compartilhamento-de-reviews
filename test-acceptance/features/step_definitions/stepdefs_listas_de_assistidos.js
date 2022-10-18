const { Given, When, Then } = require("cucumber");

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By, until} = require('selenium-webdriver');

let driver = new seleniumWebdriver.Builder().forBrowser('chrome').build();

Given("Eu estou logado com o usuário {string} de senha {string}", async function(username, password){

    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.className("LoginField")).sendKeys(username);
    await driver.findElement(By.id("passWord")).sendKeys(password);
    await driver.wait(until.elementLocated(By.css('#loginButton')), 3000).click();
    
});

Given("Eu tenho todas as listas com algum item", async function(){

   return ;

});

Given("Eu estou na página {string}", async function(path){

    await driver.get('http://localhost:3000/login'+path);

});

When("Eu clico no meu icone de usuário", async function() {
    
    await driver.wait(until.elementLocated(By.css('[data-testid]="HeaderUserIcon"')), 3000).click();

});

When("Eu clico para criar uma lista", function() {
    //realizar ação descrita no When
    throw "nada criado ainda";
});

When("Eu insiro o nome da lista {string}", function(listName) {
    //realizar ação descrita no When
    throw "nada criado ainda";
});

When("Eu clico para finalizar a criação da lista", function() {
    //realizar ação descrita no When
    throw "nada criado ainda";
});

When("Eu clico na lista {string}", function(listName) {
    //realizar ação descrita no When
    throw "nada criado ainda";
});

Then("O site mostra na tela a mensagem {string}", function(serverMsg) {
    //checar se os resultados do Then estão corretos
    throw "nada criado ainda";
});

Then("O site mostra uma tela para criação lista", function() {
    //checar se os resultados do Then estão corretos
    throw "nada criado ainda";
});

Then("O site mostra na tela as listas do usuário", function() {
    //checar se os resultados do Then estão corretos
    throw "nada criado ainda";
});

Then("O site mostra a lista {string}", function(listName) {
    //checar se os resultados do Then estão corretos
    throw "nada criado ainda";
});

