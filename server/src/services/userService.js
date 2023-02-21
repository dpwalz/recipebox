const { v4: uuid } = require("uuid");
const User = require("../models/User");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const serviceMethods = {};

serviceMethods.createUser = async (body) => {
    try {
        const id = uuid();
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        const createUser = await User.createUser(body, id);
        const newUser = await User.getOneUser(id);
        return newUser;
    } catch (err) {
        throw err;
    }
}

serviceMethods.getUserByEmail = async (body) => {
    try {
        const { email_address } = body;
        const user = await User.getUserByEmail(email_address);
        return user;
    } catch (err) {
        throw err;
    }
}

serviceMethods.login = async (body) => {
    try {
        const user = await serviceMethods.getUserByEmail(body);
        if(!user) throw new Error("No User Found");
        const hashMatch = compareSync(body.password, user.password);
        if(hashMatch) {
            user.password = undefined;
            const jsontoken = sign({ userId: user.id }, process.env.JWT_KEY);
            user.jsontoken = jsontoken;
            return user;
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (err) {
        throw err;
    }
}


module.exports = serviceMethods;