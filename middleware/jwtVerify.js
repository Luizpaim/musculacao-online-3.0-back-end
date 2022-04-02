const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");


//#region Configurando Ambiente
let dotEnv = '.env';
if (process.env.NODE_ENV) {
    dotEnv += `${process.env.NODE_ENV}`;
}
dotenv.config({ path: `./config/${dotEnv}` });
//#endregion

module.exports = {
    verifyJWT: function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
        }

        jwt.verify(token, `${process.env.SECURITY_KEY}`, function(err, decoded) {
            if (err) {
                return res.status(401).send({ auth: false, message: 'Token inválido ou expirado.' });
            }

            // se tudo estiver ok, salva no request para uso posterior (JÁ JÁ)
            req.userJwt = decoded.user;
            next();
        });
    }
};