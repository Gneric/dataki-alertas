const express = require('express')
const morgan = require('morgan')
const app = express()

app.set('port', process.env.PORT || 3003)
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(require('./src/routes/routes'))

app.listen(3003, () => {
    console.log(`Server on port ${app.get('port')}`)
})