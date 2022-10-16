require('dotenv/config');
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

    accessToken = response0.body.responseObject.accessToken;
    refreshToken = response0.body.responseObject.refreshToken;
});

afterAll(async ()=>{
    databaseController.disconnect();
});


describe(('Fetch any user data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso quando feita a busca por um usuário existente'), async () => {
        
        const response = await request(app).get('/user/getinfo/andrezzz').send();
        expect(response.status).toBe(200);
        expect(response.body.responseObject.user).not.toBeNull();
        expect(response.body.responseObject.message).toBe("Busca de informações de usuário realizada com sucesso.");

    });
    it(('deve retornar mensagem de erro e objeto de usuário nulo quando feita a busca por um usuário não existente'), async () => {

        const response = await request(app).get('/user/getinfo/andrezzz2').send();
        expect(response.status).toBe(404);
        expect(response.body.responseObject.user).toBeNull();
        expect(response.body.responseObject.message).toBe("Usuário não encontrado.");

    });

    //testar erro interno
    test(('erro na busca com o BD'), () => {

        //expect(response.status).toBe(502);

    });

});


describe(('Fetch my own data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso se usuário existir'), async () => {

        const response = await request(app).get('/user/getmyinfo').set({"x-access-token":accessToken, "x-refresh-token":refreshToken});
        expect(response.status).toBe(200);
        expect(response.body.responseObject.auth).toBeTruthy();
        expect(response.body.responseObject.user).not.toBeNull();
        expect(response.body.responseObject.message).toBe("Busca de próprias informações realizada com sucesso.");

    });

    it(('deve retornar mensagem de erro e objeto de usuário nulo se usuário não existir'), async () => {

        const session = require('../../_session');
        const fakeAccessToken = session.createAccessToken("andrezzz2");
        const fakeRefreshToken = session.createRefreshToken("andrezzz2");
        
        //fazendo request para obter informaçoes usando os tokens com um usuário não existente no bd
        const response = await request(app).get('/user/getmyinfo').set({"x-access-token": fakeAccessToken, "x-refresh-token": fakeRefreshToken});
        expect(response.status).toBe(404);
        expect(response.body.responseObject.auth).toBeTruthy();
        expect(response.body.responseObject.user).toBeNull();
        expect(response.body.responseObject.message).toBe("Usuário não encontrado.");
        
    });

    //testar erro interno
    test(('erro na busca com o BD'), () => {

        //expect(response.status).toBe(502);

    });

});