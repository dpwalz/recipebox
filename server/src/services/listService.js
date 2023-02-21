const { query } = require("express");
const { v4: uuid } = require("uuid");
const List = require("../models/ShoppingList");

const serviceMethods = {};

serviceMethods.createList = async(newList) => {
    try {
        const listId = uuid();
        const listToInsert = {
            ...newList,
            list_id: listId
        };
        const createdList = await List.createList(listToInsert);
        return listId;
    } catch (err) {
        return err;
    }
}

serviceMethods.getListsByUser = async(user) => {
    try {
        const usersLists = await List.getListsByUser(user);
        return usersLists;
    } catch (err) {
        return err;
    }
}

serviceMethods.getListDetailsById = async(list) => {
    try {
        const listDetails = await List.getListDetailsById(list);
        return listDetails;
    } catch (err) {
        return err;
    }
}



module.exports = serviceMethods;