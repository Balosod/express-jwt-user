import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {registerRouter} from './routes/userRoutes.js'
import { logUserDateRouter } from "./routes/logUserRoutes.js";
import { config } from "./configs/dbConfig.js";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = 3000;

const { db: { host, name } } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user", registerRouter);
app.use("/user/data", logUserDateRouter);

mongoose.connect(`mongodb://${host}/${name}`)
.then(()=>{console.log("connected to database successfully")})
.catch(err =>console.log(err.message));


app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})
