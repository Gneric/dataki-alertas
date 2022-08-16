const cors = require('cors')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const compress = require('compression')
const nocache = require('nocache')
const app = express()

app.use(compress())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(nocache())

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...')
  }
  if (err.name === 'StatusError') {
    res.send(err.status, err.message)
  } else {
    next(err)
  }
})

app.use(require('./api/routes/private'))
app.use(require('./api/routes/public'))

const port = 3100

http.createServer(app).listen(port, (err) => {
  if (err) {
    throw err
  }
  console.log(`listening in http://localhost:${port}`)
})