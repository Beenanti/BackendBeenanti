const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT

app.use(cors());  // use cors
app.use(express.json());  // parse requests yang berupa json
app.use(express.urlencoded({ extended: true }));  // parse requests yang berupa form data
app.use(express.static('uploads'));


//panggil routes
app.use("/auth", require('./routes/auth_route'));
app.use("/panti", require('./routes/panti_route'));
app.use("/user", require('./routes/user_route'));

//halaman root
app.get('/', (req, res) => {
  res.send('API Beenanti')
  // res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/tezz', (req, res) => {
  res.json(req.body);
});


app.listen(port, () => {
  console.log(`Beenanti API listening on http://localhost:${port}`)
})