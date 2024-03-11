import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

import formRouter from './Routes/form.router.js';

app.use("/api/v1/form",formRouter)
export{app};