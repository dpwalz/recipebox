const serviceMethods = require("../services/listService");
const listService = require("../services/listService");

const controllerMethods = {};

controllerMethods.createList = async(req, res) => {
    try {
        const listToCreate = {
            user_id: req.userId || null
        };
        const newList = await listService.createList(listToCreate);
        res.status(200).send({status: "OK", data: {list_id: newList}});
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: { error: err?.message || err }
        })
    }
}

controllerMethods.getListsByUser = async(req, res) => {
    try {
        const userPackage = {
            user_id: req.userId
        };
        const usersLists = await listService.getListsByUser(userPackage);
        res.status(200).send({status: "OK", data: usersLists});
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: { error: err?.message || err }
        })
    }
}

controllerMethods.getListDetailsById = async(req, res) => {
    try {
        const { list_id } = req.params;
        const listDetails = await listService.getListDetailsById(list_id);
        res.status(200).send({
            status: "OK", 
            data: listDetails
        });
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: { error: err?.message || err }
        });
    }
}

controllerMethods.addIngredient = async(req, res) => {
    try {
        const { list_id } = req.params;
        const { body } = req;
        if(
            !body.ingredient_id ||
            !body.quantity ||
            !body.unit
        ) {
            const error = new Error("One of the required keys is empty");
            error.status = 400
            throw error;
        }
        body.quantity = Number(body.quantity);
        body.list_id = list_id;
        const newIngredient = await listService.addIngredient(body);
        res.status(200).send({status: "OK", data: newIngredient});
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: {error: err?.message || err}
        })
    }
}

controllerMethods.removeIngredient = async(req, res) => {
    try {
        const { list_id } = req.params;
        const { body } = req;
        const itemToRemove = {
            list_id: list_id,
            ingredient_id: body.ingredient_id
        }
        const removeItem = serviceMethods.removeIngredient(itemToRemove);
        res.status(200).send({status: "OK", data: removeItem});
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: {error: err?.message || err}
        })
    }
}

controllerMethods.deleteList = async(req, res) => {
    try {
        const { body } = req;
        const { list_id } = body;
        const deleteItem = serviceMethods.deleteList(list_id);
        res.status(200).send({status: "OK", data: deleteItem});
     } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED", 
            data: {error: err?.message || err}
        })
    }
}

module.exports = controllerMethods;