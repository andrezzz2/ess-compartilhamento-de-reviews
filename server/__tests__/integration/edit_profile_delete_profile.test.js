require('dotenv/config');
const request = require('supertest');
//const session = require('../../_session');

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
    const response0 = await request(app).post('/login').send({username: "Joca", password: "senha123"});

    accessToken = response0.body.responseObject.accessToken;
    refreshToken = response0.body.responseObject.refreshToken;
});

afterAll(async ()=>{
    databaseController.disconnect();
});


describe(('Edit Profile'), () => {

    it(('deve editar o perfil do usuário'), async() => {

        var pessoa = new Object();
        pessoa.firstName = "Jorge";
        pessoa.lastName = "Camões";
        pessoa.email = "geronsasadimo_br@gmail.br";
        pessoa.bio = "nem melhor nem pior o diferencial";
        pessoa.photoURL = "https://cdna.artstation.com/p/assets/images/images/033/053/542/large/tsyo-victoria-van-den-hoef-829071c7-e8b0-4e75-8233-a3dcfe0cb745.jpg?1608242996";


        const response = await request(app).get('/user/getinfo/Joca');
        expect(response.status).toBe(200);
        expect(response.body.responseObject.user).not.toBeNull();
        expect(response.body.responseObject.message).toBe("Busca de informações de usuário realizada com sucesso.");

        const response1 = await request(app).post('/user/updateProfile').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({pessoa});
       
        const response2 = await request(app).get('/user/getinfo/Joca');
        expect(response2.status).toBe(200);
        expect(response2.body.responseObject.user.lastName).toBe("Camões");

    });
    
});

describe(('Edit Password'), () => {

    it(('deve mudar a senha do usuário'), async() => {

        const response = await request(app).get('/user/getinfo/Joca');
        expect(response.status).toBe(200);
        expect(response.body.responseObject.user).not.toBeNull();
        expect(response.body.responseObject.message).toBe("Busca de informações de usuário realizada com sucesso.");

        const response1 = await request(app).post('/user/changePassword').set({"x-access-token":accessToken, "x-refresh-token":refreshToken}).send({password: "senha123"});
        expect(response1.status).toBe(200);
        expect(response1.body.responseObject.message).toBe("Senha alterada!");

    });
    
});


describe(('Delete a account'), () => {

    it(('deve deletar o usuário'), async() => {

        const response = await request(app).get('/user/getinfo/Joca');
        expect(response.status).toBe(200);
        expect(response.body.responseObject.user).not.toBeNull();
        expect(response.body.responseObject.message).toBe("Busca de informações de usuário realizada com sucesso.");

        const response1 = await request(app).post('/user/deleteAccount').set({"x-access-token":accessToken, "x-refresh-token":refreshToken});
        
        const response2 = await request(app).get('/user/getinfo/Joca');
        expect(response2.status).toBe(404);
        expect(response2.body.responseObject.user).toBeNull();
        expect(response2.body.responseObject.message).toBe("Usuário não encontrado.");

    });
    
});