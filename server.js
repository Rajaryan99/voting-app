import express from 'express'
import 'dotenv/config'
import { connectDB } from './db/db.js';
import userRoute from './routes/user.routes.js'
import bodyParser from 'body-parser';
import candidateRoute from './routes/candidate.routes.js'
import verifyJWT from './middlewares/auth.middleware.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("Voting Application")
})

app.use('/user', userRoute);
app.use('/candidate',  candidateRoute)


connectDB();

app.listen(port, () => {
   
    console.log(`server is running on http://localhost:${port}`)
})