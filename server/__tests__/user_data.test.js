const User = require('../models/User');
const request = require('supertest');
const app = require('../app');
const mongodb = require('../mongodb');
const { BeforeAll } = require('cucumber');

beforeAll(() => {
    mongodb.connect();
})

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

});


describe(('Fetch my own data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso quando feita a busca por um usuário existente'), () => {

    });
    it(('deve retornar mensagem de erro e objeto de usuário nulo quando feita a busca por um usuário não existente'), () => {

    });

});