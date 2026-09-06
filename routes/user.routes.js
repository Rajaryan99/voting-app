import express from 'express';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

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

routes.post('/login', async (req, res) => {

    try {

       const {aadharNumber, password} = req.body;

       if(!aadharNumber || !password){
        return res.status(400).json({message: "Aadhar number and password is required"})
       }

       const loginCredientials = await User.findOne({aadharNumber});

       if(!loginCredientials){
            return res.status(401).json({message: 'Incorrect aadhar number or password'})
       }

       const isMatch = await loginCredientials.isMatchPassword(password);

       if(!isMatch){
          return res.status(401).json({message: 'Incorrect aadhar number or password'})
       }

       console.log('User logged In');
       res.status(200).json({message: "User logged In"})



        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Error while logging In"
        })
        
    }
})

routes.get('/getAllVoters', async (req, res) => {
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

routes.put('/update/:id', async (req, res) => {
    try {

        const userId = req.params.id;

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({Message: 'user Not Found'})
        }

        const updatedData = req.body;

        const updatedUserData = await User.findByIdAndUpdate(userId, updatedData, {new: true, runValidators: true});

        console.log("User Data updated");

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUserData
        })



        
    } catch (error) {

        console.error(error),
        res.status(500).json(error, {
            message: "Internal server error while updating"
        })
        
    }
})

routes.delete('/delete/:id', async (req, res) => {
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