import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },

    party: {
        type: String,
        required: true,
        enum: ['BJP', 'Congress', 'AAP']
    },

    age: {
        type: Number,
        required: true,
    },

    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: true,
            },

            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],

    voteCount: {
        type: Number,
        default: 0
    }

  
})

export default mongoose.model('Candidate', candidateSchema);
