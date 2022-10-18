const assert = require("assert");
const { Given, When, Then } = require("cucumber");

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By,until} = require('selenium-webdriver');
/*
let driver = new seleniumWebdriver.Builder()
                  .forBrowser('chrome')
                  .build();

Given('Eu estou logado com o usuario {string} e senha {string}', {timeout: 60 *1000}, async (string, string2) => {
    
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
*/