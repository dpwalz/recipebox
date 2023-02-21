const { v4: uuid } = require("uuid");
const Item = require("../models/Item");

const serviceMethods = {};

serviceMethods.getAllItems = async () => {
    const allItems = await Item.getAllItems();
    return allItems;
};

serviceMethods.addNewItem = async (newItem) => {
    try {
        const itemToInsert = {
            ...newItem, 
            id: uuid()
        };
    
        const createdItem = await Item.addNewItem(itemToInsert);
        
        return createdItem;
    } catch (err) {
        throw err;
    }
}

module.exports = serviceMethods;