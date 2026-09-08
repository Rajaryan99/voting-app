import express from 'express';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verifyJWT from '../middlewares/auth.middleware.js'

const routes = express.Router();

routes.post('/signup', async (req, res) => {
    try {

        const userData = req.body;


        const existingUser = await User.findOne({aadharNumber: userData.aadharNumber});

        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const newUser = new User(userData);
        const response  = await newUser.save();

        console.log("Data saved", response)

        res.status(201).json({response})
        
    } catch (error) {
        console.error(error),
        res.status(500).json({
            message: "Error while signing Up"
        })
        
    }
})

routes.post('/login',  async (req, res) => {

    try {

       const {aadharNumber, password} = req.body;

       if(!aadharNumber || !password){
        return res.status(400).json({message: "Aadhar number and password is required"})
       }

       const loginCredientials = await User.findOne({aadharNumber});

       if(!loginCredientials){
            return res.status(401).json({message: 'Incorrect aadhar number or password'})
       }

    //    const isMatch = await loginCredientials.isMatchPassword(password);
            const isMatch = await loginCredientials.isMatchPassword(password);

       if(!isMatch){
          return res.status(401).json({message: 'Incorrect aadhar number or password'})
       }

       const token = jwt.sign({id: loginCredientials._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})

       console.log('User logged In');
       res.status(200).json(
                    {
                        message: "User logged In",
                        token: token
                    }
                )

        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Error while logging In"
        })
        
    }
})


routes.put('/profile', verifyJWT,  async (req, res) => {
    try {

        const userData = req.body;

        const userId = userData.id;

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({Message: 'user Not Found'})
        }


        res.status(200).json({user})



        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Internal server error"
        })
        
    }
})

routes.get('/getAllVoters', verifyJWT, async (req, res) => {
    try {

       const allVoters = await User.find();

       res.status(200).json(allVoters)


        
    } catch (error) {
         console.error(error),
        res.status(500).json(error, {
            message: "No user found"
        })
     }
})

routes.put('/profile/password', verifyJWT,  async (req, res) => {
    try {

        const userId = req.user;
        const {currentPassword, newPassword} = req.body;


         const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({Message: 'user Not Found'})
        }

        if(!(await user.isMatchPassword(currentPassword))){
            return res.status(401).json({error: "Invalid password"})
        }

        user.password =  newPassword;
        await user.save();

       
        console.log("password updated");

        res.status(200).json({
            message: "Password updated successfully",
            
        })



        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Internal server error while updating"
        })
        
    }
})

routes.delete('/delete/:id', verifyJWT, async (req, res) => {
    try {

        const userId = req.params.id

        const deletedUser = await User.findByIdAndDelete(userId)

        if(!deletedUser){
              return res.status(404).json({ message: "User not found" });

        }

         res.status(200).json({ 
            message: "User deleted successfully",
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