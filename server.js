import express from 'express'
import 'dotenv/config'

const app = express();

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Voting Application")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})