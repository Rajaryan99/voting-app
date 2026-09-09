import express from 'express';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyJWT from '../middlewares/auth.middleware.js'
import Candidate from '../models/candidate.model.js'

const routes = express.Router();

//check admin role function
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user.role === "admin";
        
    } catch (error) {
        return false;
        
    }
}

//candiate route
routes.post('/', verifyJWT, async (req, res) => {
    try {

        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "Not an Admin :)"})

        const userData = req.body;


const newUser = new Candidate(userData)

        const response  = await newUser.save();

        console.log("Data saved", response)

        res.status(201).json({response})
        
    } catch (error) {
        console.error(error),
        res.status(500).json({
            message: "Internal server error"
        })
        
    }
})







routes.put('/:candidateID', verifyJWT,  async (req, res) => {
    try {

        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "Not an Admin :)"})

        const userId = req.params.candidateID;
        const updatedData = req.body;



         const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({Message: 'Candidate Not Found'})
        }

        const response  = await Candidate.findByIdAndUpdate(userId, updatedData, {
            new: true,
            runValidators: true
        })

        console.log("Candidate data updated!!")
        res.status(200).json({response})



        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Internal server error while updating"
        })
        
    }
})

routes.delete('/:candidateID', verifyJWT, async (req, res) => {
    try {


        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "Not an Admin :)"})


        const userId = req.params.candidateID;

        const deletedUser = await User.findByIdAndDelete(userId)

        if(!deletedUser){
              return res.status(404).json({ message: "Candidate  Not Found" });

        }

         res.status(200).json({ 
            message: "candidate deleted successfully",
            deletedUser: deletedUser // Optional: returns the info of the deleted user
        });




        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Internal server error while updating"
        })
        
    }
})


export default routes;