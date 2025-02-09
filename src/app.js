/*import dotenv from "dotenv"
import express from "express";
dotenv.config({
    path: './env'
})
console.log(`${process.env.mongodbURI}`)
const app = express()*/
import connectDB from "./db/index.js";
connectDB();


