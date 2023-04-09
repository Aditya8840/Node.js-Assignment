const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 3000;
const userRoute = require("./routers/user")
const authRoute = require("./routers/auth")
const transactionRoute = require("./routers/transaction")

dotenv.config();

app.use(express.json())
require('./db/mongoose')


// Profile Related
app.use("/api/user", userRoute);

// Authentication Related
app.use("/api/auth", authRoute);

//transaction related
app.use("/api/transaction", transactionRoute);

app.get('/api/server', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});