const express = require('express');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 8080;
// const userRouter = require('./routes/users');
//// Here we give .env file path using path module in nodejs
const path = require('path');

app.use(passport.initialize());

require("dotenv").config({
    path: path.join(__dirname,'.env')
})

app.use('/users',require('./routes/users'));

// console.log(process.env.HOST, process.env.PORT)

app.listen(port, ()=> {
    console.log(`app is listening at http://localhost:${port}`)
})
