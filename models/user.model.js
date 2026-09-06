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
    }
})

export default mongoose.model('User', userSchema);
