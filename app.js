const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express()
const port = 3000

// use cors
app.use(cors());

// parse requests yang berupa json
app.use(express.json());

// parse requests yang berupa form data
app.use(express.urlencoded({ extended: true }));

//panggil routes
const auth = require("./routes/auth_route");
app.use("/auth", auth);

const panti = require("./routes/panti_route");
app.use("/panti", panti);

const user = require("./routes/user_route");
app.use("/user", user);

//halaman root
app.get('/', (req, res) => {
  res.send("API Beenanti")
  // res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/example', (req, res) => {
  const {data} = req.body; // mengakses data yang dikirim dalam format JSON
  res.send(`Data yang diterima: ${data}`);
});




app.listen(port, () => {
  console.log(`Beenanti API listening on http://localhost:${port}`)
})