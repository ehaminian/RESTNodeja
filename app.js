const express = require('express')
const bodyParser = require('body-parser')
const rest = require("./middleware/rest");
const { login } = require('./middleware/auth');
config = require("./expressfile")

app = express()
app.use(express.static(config.static))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("I am here 11")
app.use((req, res, next) => {
  console.log("I am here 13")
  res.setHeader('Access-Control-Allow-Origin', config.origin);
  res.setHeader('Access-Control-Allow-Methods', config.methods);
  res.setHeader('Access-Control-Allow-Headers', config.headers);
  console.log(config.headers)
  next();
})

app.use((err, req, res, next) => {
  if(err) {
    console.log("I am here 22")
    res.status(500).json({ err })
  } else { next() }
})

app.use('/rest', rest());
app.post("/login", login);

app.listen(config.port, () => {
  console.log("I am here 31")
  console.log(`Server running on ${config.origin.split(',').shift()}`)
})

