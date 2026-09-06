import express from 'express'
import 'dotenv/config'
import { connectDB } from './db/db.js';

const app = express();

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Voting Application")
})


 connectDB();

app.listen(port, () => {
   
    console.log(`server is running on http://localhost:${port}`)
})