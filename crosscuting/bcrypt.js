const bcrypt = require("bcrypt");
const saltRounds = 10;


//comparar a requisição com oque está salvo 
const comparePassword = async function(requestPassword, password) {
    return bcrypt.compare(requestPassword, password);
}

//criptografar e salvar 
const encryptPassword = async function(password) {
    return bcrypt.hash(password, saltRounds);
}

module.exports = {
    comparePassword,
    encryptPassword
}