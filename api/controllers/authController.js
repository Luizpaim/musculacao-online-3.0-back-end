const services = require('../../services');
const usersServices = services.usersService;
const bcrypt = require('../../crosscuting/bcrypt');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');

//#region Configurando Ambiente
let dotEnv = '.env';
if (process.env.NODE_ENV) {
    dotEnv += `${process.env.NODE_ENV}`;
}
dotenv.config({ path: `./config/${dotEnv}` });
//#endregion



const auth = async function(req, res, next) {
    let user = await usersServices.authentication(req.body.email);

    if (user) {

        let isEqual = await bcrypt.comparePassword(req.body.password, user.password);

        if (isEqual) {

            //dtoPattern 
            let userDto = {
                id: user._id,
                name: user.name,
                email: user.email,
                birth_date: user.birth_date,
                sex: user.sex,
                profile: user.profile
            }

            const token = jwt.sign({ user: userDto }, `${process.env.SECURITY_KEY}`, {
                expiresIn: 6000 // 10 minutos
            });

            res.status(200).send({ auth: isEqual, user: userDto, token: token });
        }

    }

    res.status(200).send({ auth: false, user: null })

}
const renew = async function(req, res, next) {
    try {
        const token = jwt.sign({ id: req.userJwt.id, profile: req.userJwt.profile }, `${process.env.SECURITY_KEY}`, {
            expiresIn: 600 // 10 minutos
        });

        return res.status(200).send(({ auth: true, token: token }));
    } catch (error) {
        res.statusCode = error.errors ? 400 : 500;
        res.send(utilResponse.format(error));
    }
}
module.exports = {
    auth,
    renew
}