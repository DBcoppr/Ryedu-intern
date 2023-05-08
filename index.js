import * as dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { emailrouter } from './router/routes.js';


const app=express()
app.use(cors())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use("/", emailrouter)
const PORT=process.env.PORT || 8000
const CONNECTION_URL=process.env.MONGODB_URL
mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL).then((res)=>console.log("db connected")).catch((err)=>console.log("err in db connnect"))

app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})