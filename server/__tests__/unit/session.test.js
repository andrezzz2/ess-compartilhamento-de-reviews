
const session = require('../../_session');

describe((''), () => {

    test(('Inicialização de uma sessão'), () => {

        const { accessToken, refreshToken } = session.init("andrezzz");
        expect(session.isAccessTokenBelongsToRefreshToken(refreshToken, accessToken)).toBeTruthy();
        expect(session.isAccessTokenBelongsToRefreshToken(refreshToken, "batatinha123")).toBeFalsy();

    });

    test(('Invalidação de um refresh token'), () => {

        const { accessToken, refreshToken } = session.init("andrezzz2");
        expect(session.isAccessTokenBelongsToRefreshToken(refreshToken, accessToken)).toBeTruthy();

        session.invalidateRefreshToken(refreshToken);
        expect(session.allowList[String(refreshToken)]).toBe(undefined);

    });

    test(('método verifyJWT'), () => {

    });

});
