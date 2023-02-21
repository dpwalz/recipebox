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

module.exports = controllerMethods;