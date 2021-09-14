const express = require('express');
const router = express.Router();
const styleController = require("../controller/styleController")
const  authMiddleWare = require("../middleware/authMiddleware")

router.post("/addColor", authMiddleWare.isLoggedIn, styleController.addColor);
router.post("/getColors", authMiddleWare.isLoggedIn, styleController.getColors);
router.post("/getPublicColors", styleController.getPublicColors);

module.exports = router;