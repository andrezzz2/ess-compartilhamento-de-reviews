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

    accessToken = response0.body.accessToken;
    refreshToken = response0.body.refreshToken;
});

afterAll(async ()=>{
    databaseController.disconnect();
});

describe(('Unfollow a user'), () => {

    it(('deve remover o usuário do perfil que está sendo visitado da lista de seguindo do usuário da sessão e remover o usuário da sessão da lista de seguidores do usuário do perfil visitado'), async() => {
       
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
        
        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("mmag2")).toBeFalsy();

        const response2 = await request(app).get('/user/getinfo/mmag2');

        const response3 = await request(app).post('/user/addfollower/mmag2').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({followingList: response.body.user.followingList, followersList: response2.body.user.followersList});
        expect(response3.body.message).toBe("seguidor adicionado :)");

        const response4 = await request(app).get('/user/getinfo/andrezzz');
        expect(response4.body.user.followingList.includes("mmag2")).toBeTruthy();
        
    });
});

describe(('Unfollow a user you arent following'), () => {

    it(('deve gerar uma mensagem de erro avisando que o usuário não está na lista de following'), async() => {
       
        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("joaozinho222")).toBeFalsy();

        const response2 = await request(app).post('/user/removefollower/joaozinho222').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({followingList: response.body.user.followingList, followersList: ["jjpp2"]});
        expect (response2.body.message).toBe("Usuário não consta na lista de seguindo!");
    
    });
});

describe(('follow a user you are following'), () => {

    it(('deve gerar uma mensagem de erro avisando que o usuário está na lista de following'), async() => {
       
        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("mmag2")).toBeTruthy();

        const response2 = await request(app).get('/user/getinfo/mmag2');

        const response3 = await request(app).post('/user/addfollower/mmag2').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({followingList: response.body.user.followingList, followersList: response2.body.user.followersList});
        expect (response3.body.message).toBe("usuário já está na lista de seguindo!");
    
    });
});


describe(('follow a user that doesnt exist'), () => {

    it(('deve gerar uma mensagem de erro avisando que o usuário que está tentando seguir não existe'), async() => {
       
        const response = await request(app).get('/user/getinfo/andrezzz');
        expect(response.body.user.followingList.includes("joaozinho222")).toBeFalsy();

        const response2 = await request(app).get('/user/getinfo/joaozinho222');
        expect (response2.body.message).toBe("Usuário não encontrado.");
    });
});