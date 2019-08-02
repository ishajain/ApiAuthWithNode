import express from 'express'
import bodyParser from 'body-parser'
import users from './routes/users'
import mongoose from 'mongoose'
import { MONGODB_URI } from './config/keys'

const app = express()

//Middlewares
app.use(bodyParser.json())

//Routes
app.use("/users", users)

const PORT = process.env.PORT || 3000
//Connect to database and then start the server

mongoose.connect(MONGODB_URI).then(
    app.listen(PORT, () => {
    console.log(`App is running from port ${PORT}`)
})).catch(error=>console.log(error))
