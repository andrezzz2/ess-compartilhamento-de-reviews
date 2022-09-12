const User = require('../../../models/User');
const app = require('../../../app');
const database = require('../../../database');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv/config');

beforeAll(() => {
    database.connect();
});

afterAll(() => {
    database.disconnect();
});


describe((''), () => {

    //testar erro interno
    it((''), () => {



    });

});


describe((''), () => {

    //testar erro interno
    it((''), () => {



    });

});