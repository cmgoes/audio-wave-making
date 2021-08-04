const express = require('express');
const router = express.Router();

const audioRouter = require("./audio_router")

router.use("/audio", audioRouter);

module.exports = router;