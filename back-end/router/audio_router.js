const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const audioController = require("../controller/audioController")
const UploaderManager = require("../middleware/Uploader");

const { MUSICURL } = require('../db')
var Uploader = new UploaderManager(path.join(MUSICURL))

router.post("/uploadAudio", multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), audioController.uploadAudio);
router.post("/getAudios", audioController.getAudios);
router.post("/getJson", audioController.getJson);

module.exports = router;