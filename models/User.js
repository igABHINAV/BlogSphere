const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Follower"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Following"
        }
    ]
});

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("User", userSchema);