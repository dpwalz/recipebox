const { v4: uuid } = require("uuid");
const List = require("../models/ShoppingList");
const { combineUnits } = require("../config/helper");

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

serviceMethods.addIngredient = async(newIngredient) => {
    try {
        const { ingredient_id, list_id } = newIngredient;
        const existingItem = await serviceMethods.getIngredientById(newIngredient);
        let itemDetails;
        if(existingItem){
            itemDetails = await combineUnits(newIngredient, existingItem);
            console.log(itemDetails)
            const itemToUpdate = {
                ...itemDetails,
                ingredient_id: ingredient_id,
                list_id: list_id
            }   
            // console.log(itemToUpdate);
            const updateItem = await serviceMethods.updateIngredient(itemToUpdate);
            return updateItem;
        } else {
            const insertItem = await List.addIngredient(newIngredient);
            return insertItem;
        }  
    } catch (err) {
        return err;
    }
}

serviceMethods.getIngredientById = async(ingredient) => {
    try {
        const { list_id, ingredient_id } = ingredient;
        const getItem = await List.getIngredientById(list_id, ingredient_id);
        return getItem;
    } catch (err) {
        return err;
    }
}

serviceMethods.updateIngredient = async(item) => {
    try {
        const updateItem = await List.updateIngredient(item);
        return updateItem;
    } catch (err) {
        return err;
    }
}

serviceMethods.removeIngredient = async(item) => {
    try {
        const { list_id, ingredient_id } = item;
        const removeItem = await List.removeIngredient(list_id, ingredient_id);
        if(removeItem.affectedRows){
            return removeItem;
        } else {
            const error = new Error("Item unavailable for delete action.");
            error.status = 404;
            throw error
        }
    } catch (err) {
        throw err;
    }
}

module.exports = serviceMethods;