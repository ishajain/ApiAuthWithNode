import express from 'express'
import bodyParser from 'body-parser'
const app = express()

//Middlewares
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000
//Connect to database and then start the server


app.listen(PORT, () => {
    console.log(`App is running from port ${PORT}`)
})


module.exports = app
