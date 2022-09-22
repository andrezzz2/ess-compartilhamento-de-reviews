
const session = require('../../_session');

describe((''), () => {

    //testar erro interno
    test(('Inicialização de uma sessão'), () => {

        const { accessToken, refreshToken } = session.init("andrezzz");
        expect(session.allowList[refreshToken]).toBe(accessToken);

    });

});


describe((''), () => {

    //testar erro interno
    it((''), () => {



    });

});