import express from "express"
import { emailcheck } from "../controller/emailregister.js"
export const emailrouter=express.Router()
emailrouter.post("/emailrequire",emailcheck)