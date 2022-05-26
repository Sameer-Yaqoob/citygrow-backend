require("dotenv").config();
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');
var cors = require('cors');


const app = express();
app.use(cors())
app.use(urlencoded({ extended: false }));
require("./routes")(app);

http.createServer(app).listen(process.env.PORT || 1337, () => {
  console.log('Express server listening on port 1337');
});