const { getAllRecipes } = require("../services/recipeService");
const userService = require("../services/userService");

const controllerMethods = {};

controllerMethods.createUser = async (req, res) => {
    try {

        const { body } = req;
        if(
            !body.first_name ||
            !body.last_name ||
            !body.email_address ||
            !body.password
        ) {
            const error = new Error("One of the required keys is empty");
            error.status = 400
            throw error;
        } 
        const createdUser = await userService.createUser(body);
        createdUser.password = null;
        res.status(201).send({status: "OK", data: createdUser});
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED", 
            data: { error: err?.message || err },
        });
    }
}

controllerMethods.getUserRecipes = async (req, res) => {
    try {
        const { userId } = req.params;
        if(req.userId !== userId ) {
            const error = new Error("User not authorized to access this information");
            error.status = 401;
            throw error;
        }
        const query = {};
        query.user_id = userId;
        const userRecipes = await getAllRecipes(query);
        res.status(200).send({
            status: "OK",
            data: userRecipes
        });
    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED",
            data: { error: err?.message || err },
        })
    }
}


controllerMethods.login = async (req, res) => {
    try {
        const { body } = req;
        const loginAttempt = await userService.login(body);
        res.status(200).send({status:"OK", data: loginAttempt});

    } catch (err) {
        res.status(err?.status || 500).send({
            status: "FAILED", 
            data: { error: err?.message || err },
        });
    }
}

module.exports = controllerMethods;

