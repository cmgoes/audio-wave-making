const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./db')
const app = express()
const server = require("http").Server(app)
const router = require("./router")
const path = require("path")
const {
  seedAudio
} = require("./model/db_seeder");

const DBURL = process.env.NODE_ENV == "development" ? config.TESTDB : config.PRODB
const ServerPort = process.env.NODE_ENV == "development" ? config.DevServerPort : config.ServerPort

mongoose.connect(DBURL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('Database is connected')
  seedAudio()

  app.use(cors())

  app.use(express.static("./clients"))
  app.use(express.static("./upload"))
  app.use(bodyParser.json({
    limit: "15360mb",
    type: 'application/json'
  }))
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use('/api', router)

  app.get('/', (req, res) => {
    res.sendFile(path.join(config.DIR, 'clients/index.html'))
  })

  server.listen(ServerPort, () => {
    console.log(`Started server on => http://localhost:${ServerPort}`)
  })
},
  err => {
    console.log('Can not connect to the database' + err)
  }
)