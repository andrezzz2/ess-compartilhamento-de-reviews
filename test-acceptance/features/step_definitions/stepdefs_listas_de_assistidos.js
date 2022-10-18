const { Given, When, Then, AfterAll, After } = require("cucumber");
const chai = require("chai");
var expect = chai.expect;

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By, until} = require('selenium-webdriver');

let driver = new seleniumWebdriver.Builder().forBrowser('chrome').build();


Given("Eu estou logado com o usuário {string} de senha {string}", async function(username, password){

    //tentando deslogar se tiver alguem logado
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

    //logando com usuario
    await driver.get('http://localhost:3000/login');
    await driver.wait(until.elementLocated(By.id("userName")), 2000).sendKeys(username);
    await driver.wait(until.elementLocated(By.id("passWord")), 2000).sendKeys(password);
    await driver.wait(until.elementLocated(By.id("loginButton")), 2000).click();

}); 

Given("Eu tenho todas as listas com algum item", async function(){
   return ;
});

Given("Eu não tenho nenhum item nas listas", async function(){
    return ;
 });

Given("Eu estou na página {string}", async function(path){

    await driver.get('http://localhost:3000'+path);

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

When("Eu clico no filme com id {string}", async function(id) {

    try{    
        await driver.wait(until.elementLocated(By.id(id)), 2000).click();
    } catch (error){
        await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000).click();
    }
        
});

When("Eu clico na serie com id {string}", async function(id) {

    try{    
        await driver.wait(until.elementLocated(By.id(id)), 2000).click();
    } catch (error){
        await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000).click();
    }
        
});

When("Eu clico no livro com id {string}", async function(id) {

    try{    
        await driver.wait(until.elementLocated(By.id(id)), 2000).click();
    } catch (error){
        await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000).click();
    }
        
});

Then("O filme com id {string} se expande e mostra título {string} status {string} nota {string} e ano {string}", async function(id, titulo, status, rate, year){
    
    let movie;
    try{    
        movie = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        movie = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let movieText = await movie.getText();
    expect(movieText).to.equal(titulo+'\n'+year+'\n'+status);
    movie.findElement(By.css('[rate="'+rate+'"]'));

})

Then("A serie com id {string} se expande e mostra título {string} status {string} nota {string} e ano {string}", async function(id, titulo, status, rate, year){
    
    let serie;
    try{    
        serie = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        serie = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let serieText = await serie.getText();
    expect(serieText).to.equal(titulo+'\n'+year+'\n'+status);
    serie.findElement(By.css('[rate="'+rate+'"]'));
    
})

Then("O livro com id {string} se expande e mostra título {string} status {string} nota {string} e ano {string}", async function(id, titulo, status, rate, year){
    
    let book;
    try{    
        book = await driver.wait(until.elementLocated(By.id(id)), 2000);
    } catch (error){
        book = await driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 2000);
    }
    
    let bookText = await book.getText();
    expect(bookText).to.equal(titulo+'\n'+year+'\n'+status);
    book.findElement(By.css('[rate="'+rate+'"]'));
    
})

Then("A lista movies exibe a mensagem {string}", async function(emptyListMessage){
    
    let emptyList;
    try{    
        emptyList = await driver.wait(until.elementLocated(By.id("movieEmptyList")), 2000);
    } catch (error){
        emptyList = await driver.wait(until.elementIsVisible(driver.findElement(By.id("movieEmptyList"))), 2000);
    }
    
    let emptyListText = await emptyList.getText();
    expect(emptyListText).to.equal(emptyListMessage);
    
})

Then("A lista series exibe a mensagem {string}", async function(emptyListMessage){
    
    let emptyList;
    try{    
        emptyList = await driver.wait(until.elementLocated(By.id("serieEmptyList")), 2000);
    } catch (error){
        emptyList = await driver.wait(until.elementIsVisible(driver.findElement(By.id("serieEmptyList"))), 2000);
    }
    
    let emptyListText = await emptyList.getText();
    expect(emptyListText).to.equal(emptyListMessage);
    
})

Then("A lista books exibe a mensagem {string}", async function(emptyListMessage){
    
    let emptyList;
    try{    
        emptyList = await driver.wait(until.elementLocated(By.id("bookEmptyList")), 2000);
    } catch (error){
        emptyList = await driver.wait(until.elementIsVisible(driver.findElement(By.id("bookEmptyList"))), 2000);
    }
    
    let emptyListText = await emptyList.getText();
    expect(emptyListText).to.equal(emptyListMessage);
    
})

AfterAll(()=>{
    driver.quit();
});