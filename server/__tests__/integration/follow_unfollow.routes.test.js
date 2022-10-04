require('dotenv/config');
const session = require('../../_session');
const request = require('supertest');


describe(('Unfollow a user'), () => {

    it(('deve remover o usuário do perfil que está sendo visitado da lista de seguindo do usuário da sessão e remover o usuário da sessão da lista de seguidores do usuário do perfil visitado'), async() => {
        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);

        const response0 = await request(app).post('/login').send({username: "andrezzz"});
        const accessToken = response0.body.accessToken;
        const refreshToken = response0.body.refreshToken;

        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("mmag2")).toBeTruthy();

        const response2 = await request(app).get('/user/getinfo/mmag2');

        const response3 = await request(app).post('/user/removefollower/mmag2').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({followingList: response.body.user.followingList, followersList: response2.body.user.followersList});
        expect (response3.body.message).toBe("seguidor removido!");
        
        const response4 = await request(app).get('/user/getinfo/andrezzz');
        expect(response4.body.user.followingList.includes("mmag2")).toBeFalsy();
        
    });
});



describe(('Follow a user'), () => {

    it(('deve adicionar o usuário do perfil que está sendo visitado à lista de seguindo do usuário da sessão e adicionar o usuário da sessão à lista de seguidores do usuário do perfil que está sendo visitado'), async() => {
        const Database = require('../../_database');
        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        await database.connect();
        const app = require('../../_app')(database);

        const response0 = await request(app).post('/login').send({username: "andrezzz"});
        const accessToken = response0.body.accessToken;
        const refreshToken = response0.body.refreshToken;


        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("mmag2")).toBeFalsy();

        const response2 = await request(app).get('/user/getinfo/mmag2');

        const response3 = await request(app).post('/user/addfollower/mmag2').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({followingList: response.body.user.followingList, followersList: response2.body.user.followersList});
        expect(response3.body.message).toBe("seguidor adicionado :)");

        const response4 = await request(app).get('/user/getinfo/andrezzz');
        expect(response4.body.user.followingList.includes("mmag2")).toBeTruthy();
        
        
    });
});

