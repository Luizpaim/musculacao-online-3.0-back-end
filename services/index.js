const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');


mongoose.Promise = global.Promise;

//#region Configurando Ambiente
let dotEnv = '.env';
if (process.env.NODE_ENV) {
    dotEnv += `${process.env.NODE_ENV}`;
}
dotenv.config({ path: `./config/${dotEnv}` });
//#endregion

mongoose.connect(`mongodb+srv://Paim:${process.env.DB_PASSWORD}@cluster0.npcwa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log("MongoDb Connection Succeeded.")
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const services = {};

services.usersService = require('./usersServices');
services.profilesService = require('./profilesServices');
module.exports = services;