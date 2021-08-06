const express = require('express');
const router = express.Router();
const styleController = require("../controller/styleController")

router.post("/addColor", styleController.addColor);
router.post("/getColors", styleController.getColors);

module.exports = router;