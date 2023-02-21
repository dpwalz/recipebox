const express = require("express");
const { checkUserId } = require("../../auth/validation");
const listController = require("../../controllers/listController");

const router = express.Router();

router.post("/", checkUserId, listController.createList);

module.exports = router;