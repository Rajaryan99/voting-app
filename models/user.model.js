import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },

    age: {
        type: Number,
        min: [18, "You must be atleast 18 years old to register."],
        required: true
    },

    email: {
        type: String,
        unique: [true, 'Email must be unique']

    },

    address: {
        type: String,
        required: [true, "Address is required"]
    },

    PhoneNumber:{
        type: String,
        required: [true, "Phone number is required"],
    },

    aadharNumber: {
        type: String,
        required: [true, "Aadhar Number is required"],
        unique: true,
    },
    
    password: {
        type: String,
        required: [true, 'Passowrd is required'],
        minlength: [3, 'Atleast 3 character is required'],
        maxlength: [16, 'max 20 character is allowed']
    },

    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },

    isVoted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('User', userSchema);
