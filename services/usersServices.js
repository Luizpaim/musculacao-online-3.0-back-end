//Responsavel por regras e acesso a base
const user = require('../models/user');
const bcrypt = require('../crosscuting/bcrypt');
const moment = require("moment");

//CRUD

//CREATE
const create = async function(userAuth, item) {

    try {
        item.createdAt = moment().add(-3, 'hours').format();
        item.userCreate = { _id: userAuth._id, name: userAuth.name }

        item.password = await bcrypt.encryptPassword(item.password);

        let result = await user.create(item);
        return result;
    } catch (error) {
        throw error;
    }
}

//READ/
const find = async function(params) {
        try {
            let filtros = { deletedAt: null };

            if (params.name) {
                filtros["name"] = { $regex: '.*' + params.name + '.*', $options: 'i' };
            }
            if (params.email) {
                filtros["email"] = { $regex: '.*' + params.email + '.*', $options: 'i' };
            }

            let result = await user.find(filtros, { password: 0 });
            return result;
        } catch (error) {
            throw error;
        }
    }
    //READ BY ID
const findById = async function(id) {
    try {
        let result = await user.findById(id, { password: 0 });
        return result;
    } catch (error) {
        throw error;
    }
}
const authentication = async function(email) {
        try {
            let result = await user.findOne({ email: email }, {});
            return result;
        } catch (error) {
            throw error;
        }
    }
    //UPDATE
const update = async function(userAuth, id, item) {
        try {
            item.updatedAt = moment().add(-3, 'hours').format();
            item.userUpdate = { _id: userAuth._id, name: userAuth.name }

            item.password = await bcrypt.encryptPassword(item.password);
            let result = await user.findByIdAndUpdate(id, item);
            return result;
        } catch (error) {
            throw error;
        }
    }
    //DELETE (*) logica
const destroy = async function(userAuth, id) {
    try {
        let item = await user.findById(id);

        item.deletedAt = moment().add(-3, 'hours').format();
        item.userDelete = { _id: userAuth._id, name: userAuth.name }

        let result = await user.findByIdAndUpdate(id, item);
        return result;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    create,
    find,
    findById,
    update,
    destroy,
    authentication
}