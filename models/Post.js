const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    caption: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            message: String,
            identity: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Post" , postSchema);