const Database = require('../../_database');
require('dotenv/config');

describe(('Funcionamento da classe do banco de dados'), () => {

    it(('deve ter suas propriedades de acordo com as variáveis de ambiente'), () => {

        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        expect(database.username).toBe(process.env.DB_USERNAME);
        expect(database.password).toBe(process.env.DB_PASSWORD);
        expect(database.cluster).toBe(process.env.DB_CLUSTER);
        expect(database.dbName).toBe(process.env.DB_NAME);

    });

    test(('método para conectar com o BD remoto'), async () => {

        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);

        expect(database.isConnected()).toBeFalsy();

        const response = await database.connect();
        expect(response.message).toBe('Connected to the database.');
        
        expect(database.isConnected()).toBeTruthy();

    });

    test(('método para desconectar do BD remoto'), async () => {

        const database = new Database(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);
        const response = await database.connect();

        expect(response.message).toBe('Connected to the database.');
        expect(database.isConnected()).toBeTruthy();

        database.disconnect();
        expect(database.isConnected()).toBeFalsy();

    });

    //erro ao conectar
    test(('conexão com usuário errado'), async () => {

        const database = new Database("bla", process.env.DB_PASSWORD, process.env.DB_CLUSTER, process.env.DB_NAME);
        const response = await database.connect();

        expect(response.message).toBe("MongoServerError: bad auth : Authentication failed.");

    });


});