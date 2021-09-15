const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const audioController = require("../controller/audioController")
const UploaderManager = require("../middleware/Uploader");
const authMiddleWare = require("../middleware/authMiddleware")

const { MUSICURL } = require('../db')
var Uploader = new UploaderManager(path.join(MUSICURL))

router.post("/uploadAudio", authMiddleWare.isLoggedIn, multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), audioController.uploadAudio);
router.post("/uploadRecording", authMiddleWare.isLoggedIn, multer().any(), audioController.uploadRecording);
router.post("/getAudiosByUserId", authMiddleWare.isLoggedIn, audioController.getAudiosByUserId);
router.post("/getDefaultAudio", audioController.getDefaultAudio);
router.post("/getJson", audioController.getJson);

module.exports = router;