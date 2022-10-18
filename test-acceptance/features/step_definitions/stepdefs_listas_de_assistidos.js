const { Given, When, Then, AfterAll, After } = require("cucumber");
const chai = require("chai");
var expect = chai.expect;

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By, until} = require('selenium-webdriver');

let driver = new seleniumWebdriver.Builder().forBrowser('chrome').build();


Given("Eu estou logado com o usuário {string} de senha {string}", async function(username, password){

    await driver.get('http://localhost:3000/');
    try{    
        await driver.wait(until.elementLocated(By.css("#headerLogOut")), 2000).click();
    } catch (error){
        console.error("tentando deslogar - "+error.name);
        try{
            await driver.wait(until.elementIsVisible(driver.findElement(By.css("#headerLogOut"))), 2000).click();
        }catch (error){
            console.error("tentando deslogar - "+error.name);
        }
    }

    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id("userName")), 2000).sendKeys(username);
    await driver.wait(until.elementLocated(By.id("passWord")), 2000).sendKeys(password);
    await driver.wait(until.elementLocated(By.id("loginButton")), 2000).click();
    
    await driver.wait(until.elementLocated(By.css(".HomePage")), 2000);

}); 

Given("Eu tenho todas as listas com algum item", async function(){

   return ;

});

Given("Eu estou na página {string}", async function(path){

    await driver.get('http://localhost:3000/login'+path);

});

When("Eu clico no meu icone de usuário", async function() {

    try{
        await driver.wait(until.elementLocated(By.css("#userIcon")), 2000).click();
    } catch(error){
        await driver.wait(until.elementIsVisible(driver.findElement(By.css("#userIcon"))), 2000).click();
    }

    try{
        await driver.wait(until.elementLocated(By.css(".ProfilePage")), 2000).click();
    } catch(error){
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(".ProfilePage"))), 2000);
    }
        
});

Then("A lista movies mostra o item com id {string} com título {string} com status {string}", async function(id, titulo, status){
    
    let movie;
    try{    
        movie = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        movie = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let movieText = await movie.getText();
    expect(movieText).to.equal(titulo+'\n'+status);

})

Then("A lista series mostra o item com id {string} com título {string} com status {string}", async function(id, titulo, status){
    
    let serie;
    try{    
        serie = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        serie = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let serieText = await serie.getText();
    expect(serieText).to.equal(titulo+'\n'+status);

})

Then("A lista books mostra o item com id {string} com título {string} com status {string}", async function(id, titulo, status){
    
    let book;
    try{    
        book = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        book = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let bookText = await book.getText();
    expect(bookText).to.equal(titulo+'\n'+status);

})


AfterAll(()=>{
    driver.quit();
});