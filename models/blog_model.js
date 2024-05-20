import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is a required field"],
        minlength: 5
    },
    content: {
        type: String,
        required: [true, "Content is a required field"],
        minlength: 5
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: [true, "Userid is a required field"]
    },
    category: {
        type: String,
        enum: ['Technology', 'Entertainment', 'Sports', 'Art'],
        default: null
    },
    // likes: [{
    //     userId: {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Users', 
    //         required: true
    //     }
    // }],
    // comments: [{
    //     userId: {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Users', 
    //         required: true
    //     },
    //     text: { 
    //         type: String,
    //         required: true
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }]
    
}, { timestamps: true });

const Blogs = mongoose.model('Blogs', blogSchema);

export default Blogs;
