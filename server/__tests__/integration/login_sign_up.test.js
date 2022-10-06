require('dotenv/config');
//const session = require('../../_session');
const request = require('supertest');

var app;
var databaseController;
var accessToken;
var refreshToken;

//conecta com db, cria app, faz login e salva accessToken e refreshToken para serem usados nos testes
beforeAll(async ()=>{
    const DatabaseController = require('../../_database');
    databaseController = new DatabaseController(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);
    await databaseController.connect();

    app = require('../../_app')(databaseController);
    const response0 = await request(app).post('/login').send({username: "andrezzz", password: "senha123"});

    accessToken = response0.body.accessToken;
    refreshToken = response0.body.refreshToken;
});

afterAll(async ()=>{
    databaseController.disconnect();
});


describe(('Login'), () => {

    it((''), () => {

    });
    test((''), () => {

    });
});

describe(('SignUp'), () => {

    it((''), () => {

    });
    test((''), () => {

    });
});
