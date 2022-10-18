const assert = require("assert");
const { Given, When, Then } = require("cucumber");

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By,until} = require('selenium-webdriver');

let driver = new seleniumWebdriver.Builder()
                  .forBrowser('chrome')
                  .build();

Given('Eu estou logado com o usuario {string} e senha {string}', {timeout: 60 *1000}, async (string, string2) => {
    await driver.manage().window().maximize();
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.className("LoginField")).sendKeys(string);
    await driver.findElement(By.id("passWord")).sendKeys(string2);
    try{
        await driver.wait(until.elementLocated(By.id("loginButton")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }    
})

Given('Eu estou na pagina de profile', async() =>{
    try{
        await driver.wait(until.elementLocated(By.id("userIcon")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }   
})

When('Eu clico em {string}', async(string) =>{
    try{
        await driver.wait(until.elementLocated(By.className(string+"Option")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }
})

Then('O site mostra a lista de amigos do usuário {string}', async(string)=>{
    var name = await driver.findElement(By.id('friend-name')).getText();
    console.log(name);
    expect(name).not.toBeNull();
    await driver.quit();
})


Given('eu não tenho o usuario "jjp" na lista de seguindo', async()=>{
    try{
        await driver.wait(until.elementLocated(By.className("FollowingOption")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }
})

When('vou pro perfil de {string}',async(string)=>{
    await driver.get('http://localhost:3000/profile/jjp');
})

When('eu clico no botao {string}',async(string)=>{
    try{
        await driver.wait(until.elementLocated(By.className("Follow-button")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    } 
    
    
    await driver.navigate().refresh();
   
})

Then('o usuário {string} é adicionado à lista de seguindo',async()=>{
    var name = await driver.findElement(By.className('Unfollow-button')).getText();
    expect(name).equal("Unfollow");
    await driver.quit();
})

/*
Given('{string} esta na minha lista de seguindo',async()=>{
    try{
        await driver.wait(until.elementLocated(By.className("FollowingOption")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }
})

When('visito o perfil de {string}',async(string)=>{
    await driver.get('http://localhost:3000/profile/jjp');
})

When('eu clico no botao de {string}',async(string)=>{
    try{
        await driver.wait(until.elementLocated(By.className("Unfollow-button")), 5000).click();
    }
    catch(erro){
        console.log(erro);
    }
    await driver.navigate().refresh();
})

Then('{string} é removido da minha lista de seguindo',async()=>{
    var name = await driver.findElement(By.className('Follow-button')).getText();
    expect(name).equal("Follow");

    await driver.quit();
})
*/