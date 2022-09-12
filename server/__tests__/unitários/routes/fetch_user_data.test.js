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

describe(('Fetch any user data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso quando feita a busca por um usuário existente'), async () => {

        const response = await request(app).get('/user/getinfo/andrezzz').send();
        expect(response.status).toBe(200);
        expect(response.body.user).not.toBeNull();
        expect(response.body.message).toBe("Busca de informações de usuário realizada com sucesso.");

    });
    it(('deve retornar mensagem de erro e objeto de usuário nulo quando feita a busca por um usuário não existente'), async () => {

        const response = await request(app).get('/user/getinfo/andrezzz2').send();
        expect(response.status).toBe(404);
        expect(response.body.user).toBeNull();
        expect(response.body.message).toBe("Usuário não encontrado.");

    });

    //testar erro interno
    it((''), () => {

        //expect(response.status).toBe(500);

    });

});


describe(('Fetch my own data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso se usuário existir'), async () => {

        const accessToken = jwt.sign({ username: "andrezzz" }, process.env.SECRET, {
            expiresIn: 120 // expires in 2 minutes
        });
        const refreshToken = jwt.sign({ username: "andrezzz" }, process.env.SECRET, {
            expiresIn: 604800 // expires in one week
        });

        //fazendo request para obter informaçoes usando os tokens obtidos anteriormente
        const response = await request(app).get('/user/getmyinfo').set({"x-access-token":accessToken, "x-refresh-token":refreshToken});
        expect(response.status).toBe(200);
        expect(response.body.auth).toBeTruthy();
        expect(response.body.user).not.toBeNull();
        expect(response.body.message).toBe("Busca de próprias informações realizada com sucesso.");
        
    });

    it(('deve retornar mensagem de erro e objeto de usuário nulo se usuário não existir'), async () => {
        
        const accessToken = jwt.sign({ username: "andrezzz2" }, process.env.SECRET, {
            expiresIn: 120 // expires in 2 minutes
        });
        const refreshToken = jwt.sign({ username: "andrezzz2" }, process.env.SECRET, {
            expiresIn: 604800 // expires in one week
        });

        //fazendo request para obter informaçoes usando os tokens obtidos anteriormente
        const response = await request(app).get('/user/getmyinfo').set({"x-access-token":accessToken, "x-refresh-token":refreshToken});
        expect(response.status).toBe(404);
        expect(response.body.auth).toBeTruthy();
        expect(response.body.user).toBeNull();
        expect(response.body.message).toBe("Usuário não encontrado.");
        
    });

    //testar erro interno
    it((''), () => {

        //expect(response.status).toBe(500);

    });

});