const itemService = require("../services/itemService");


const controllerMethods = {}

controllerMethods.getAllItems = async (req, res) => {
    const allItems = await itemService.getAllItems();
    res.status(200).send({ status: "OK", data: allItems });
};

controllerMethods.addNewItem = async (req, res) => {
    const { body } = req;
    if (
        !body.name
    ) {
        const error = new Error("One of the following keys is missing or is empty in request body: 'name'");
        error.status = 400;
        throw error;
    }

    const newItem = {
        name: body.name
    };
    try {
        const createdItem = await itemService.addNewItem(newItem);
        res.status(201).send({ status: "OK", data: newItem });
    } catch(err) {
        res.status(err?.status || 500).send({
            status: "FAILED", 
            data: { error: err?.message || err },
        });
    }
    
}



module.exports = controllerMethods;