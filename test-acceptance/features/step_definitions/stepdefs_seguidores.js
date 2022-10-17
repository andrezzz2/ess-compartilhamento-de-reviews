const assert = require("assert");
const { Given, When, Then } = require("cucumber");

require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');

let driver = new seleniumWebdriver.Builder()
                  .forBrowser('chrome')
                  .build();