import express from 'express'
import bodyParser from 'body-parser'
import users from './routes/users'
import mongoose from 'mongoose'
import { MONGODB_URI } from './config/keys'
import cors from 'cors'
// import proxy from 'http-proxy-middleware'
const app = express()

//Middlewares
app.use(cors())
app.use(bodyParser.json())
//app.use(proxy('/users/**', { target: 'http://localhost:8000/' }));

//Routes
app.use("/users", users)

//Connect to database
mongoose.connect(MONGODB_URI).then(console.log(`App  is connected to the database`)).catch(error=>console.log(error))

module.exports = app

