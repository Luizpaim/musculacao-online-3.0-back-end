const mongoose = require("mongoose");


const userAuth = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String
});

const profile = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String
});

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O Email é obrigatório']
    },
    birth_date: String,
    sex: String,
    password: String,
    profile: profile,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    userCreate: {
        type: userAuth
    },
    userUpdate: {
        type: userAuth
    },
    userDelete: {
        type: userAuth
    },

}, { collection: 'users' });

module.exports = mongoose.model('users', user);