require('dotenv/config');
const session = require('../../_session');
const request = require('supertest');


describe(('Fetch any user data'), () => {

    it(('deve retornar todas as informações do usuário e mensagem de sucesso quando feita a busca por um usuário existente'), async () => {
        
        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);

        const response = await request(app).get('/user/getinfo/andrezzz').send();
        expect(response.status).toBe(200);
        expect(response.body.user).not.toBeNull();
        expect(response.body.message).toBe("Busca de informações de usuário realizada com sucesso.");

    });
    it(('deve retornar mensagem de erro e objeto de usuário nulo quando feita a busca por um usuário não existente'), async () => {

        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);

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

        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);

        const accessToken = session.createAccessToken("andrezzz");
        const refreshToken = session.createRefreshToken("andrezzz");

        //fazendo request para obter informaçoes usando os tokens obtidos anteriormente
        const response = await request(app).get('/user/getmyinfo').set({"x-access-token":accessToken, "x-refresh-token":refreshToken});
        expect(response.status).toBe(200);
        expect(response.body.auth).toBeTruthy();
        expect(response.body.user).not.toBeNull();
        expect(response.body.message).toBe("Busca de próprias informações realizada com sucesso.");
        
    });

    it(('deve retornar mensagem de erro e objeto de usuário nulo se usuário não existir'), async () => {

        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);
        
        const accessToken = session.createAccessToken("andrezzz2");
        const refreshToken = session.createRefreshToken("andrezzz2");
        
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