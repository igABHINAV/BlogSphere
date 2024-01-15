const User = require("../../models/User");
const Post = require("../../models/Post");

exports.getAllPostsByUser = async (req, res) => {
    const userId = req.user.userId; // Assuming you pass the user ID in the request parameters

    try {
        const posts = await Post.find({ owner: userId })
        if (posts.length === 0) {
            return res.status(404).json({ error: 'No posts found for this user' });
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};