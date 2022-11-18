const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const register = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user", register);

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("connected to database successfully")})
.catch(err =>console.log(err.message));


app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})
