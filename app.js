
const express = require('express')
const app = express()
const port = 3010

app.use(express.json())

app.use(express.static('public'))

app.use(require('./routes/static'))

app.use('/api/v1/menu', require('./routes/api/v1/menu'))

app.listen(port, () => console.log(`http://localhost:${port}/`))