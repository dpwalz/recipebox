const express = require("express");
const { checkToken, checkUserId } = require("../../auth/validation");
const listController = require("../../controllers/listController");

const router = express.Router();

router.post("/", checkUserId, listController.createList);

router.get("/", checkToken, listController.getListsByUser );

router.get("/:list_id", listController.getListDetailsById);

module.exports = router;