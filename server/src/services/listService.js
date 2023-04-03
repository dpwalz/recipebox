const { v4: uuid } = require("uuid");
const List = require("../models/ShoppingList");
const { combineUnits, conversionAvailable } = require("../config/helper");

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
        if(usersLists.length){
            return usersLists;
        } else {
            const error = new Error("User currently has no lists");
            error.status = 404;
            throw error;
        }
    } catch (err) {
        throw err;
    }
}

serviceMethods.getListDetailsById = async(list) => {
    try {
        const listDetails = await List.getListDetailsById(list);
        // if(listDetails.length){
        //     return listDetails;
        // } else {
        //     const error = new Error("List does not exist or is empty");
        //     error.status = 404;
        //     throw error;
        // }
        return listDetails;
    } catch (err) {
        throw err;
    }
}

serviceMethods.addIngredient = async(newIngredient) => {
    try {
        const { ingredient_id, list_id } = newIngredient;
        const existingItems = await serviceMethods.getIngredientById(newIngredient);
        let itemDetails;
        if(existingItems.length > 0){
            for(let i = 0; i < existingItems.length; i++){
                let canCombine = await conversionAvailable(newIngredient.unit, existingItems[i].unit);
                if(canCombine){
                    itemDetails = await combineUnits(newIngredient, existingItems[i]);
                    const itemToUpdate = {
                        ...itemDetails,
                        ingredient_id: ingredient_id,
                        list_id: list_id
                    }   
                    const updateItem = await serviceMethods.updateIngredient(itemToUpdate);
                    return updateItem;
                }  
            }
        } 
        const insertItem = await List.addIngredient(newIngredient);
        return insertItem;  
    } catch (err) {
        console.log(err);
        throw err;
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
        throw err;
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

serviceMethods.deleteList = async(list_id) => {
    try {
        const deleteItem = await List.deleteList(list_id);
        if(deleteItem.affectedRows){
            return deleteItem;
        } else {
            const error = new Error("List unavailable for delete action.");
            error.status = 404;
            throw error;
        }
    } catch (err) {
        throw err;
    }
}

serviceMethods.addIngredients = async(list_id, items) => {
    try {
        let counter = 0;
        for (let i = 0; i < items.length; i++) {
            const itemToAdd = {
                ...items[i],
                list_id: list_id
            }
            const addItem = await serviceMethods.addIngredient(itemToAdd);
            counter++;
        }
        
        return `${counter} items added to list`;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = serviceMethods;