import app from './app'

const PORT = process.env.PORT || 8000
//start the server

app.listen(PORT, () => {
    try {
        console.log(`App is running from port ${PORT}`)
 
    } catch (error) {
        console.log(error)
    }
})


