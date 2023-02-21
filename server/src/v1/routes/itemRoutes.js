const express = require("express");

const itemController = require("../../controllers/itemController");

const router = express.Router();

router.get("/", itemController.getAllItems);
router.post("/", itemController.addNewItem);

module.exports = router;