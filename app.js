const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('API Beenanti')
})

app.listen(port, () => {
  console.log(`Beenanti API listening on http://localhost:${port}`)
})