const User = require("../../models/User");
const Post = require("../../models/Post");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}