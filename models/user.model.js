import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

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

    phoneNumber:{
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

userSchema.pre('save', async function (next){

    //only hash if password is new or chnaged

    if(!this.isModified('password')){
        return;
    }

    try {

        const salt = await bcrypt.genSalt(10)
        this.password  = await bcrypt.hash(this.password, salt)
        // next()
        
    } catch (error) {
        next(error)
        
    }
})

// userSchema.method.isMatchPassword = async function(userPassword){
//     return  bcrypt.compare(userPassword, this.password)
// }

userSchema.methods.isMatchPassword = async function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model('User', userSchema);
