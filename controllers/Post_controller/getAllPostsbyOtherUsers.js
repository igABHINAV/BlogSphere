const User = require("../../models/User");
const Post = require("../../models/Post");

exports.getAllPostsbyOtherUsers = async (req, res) => {
    const userId = req.body.userId;

    try {
        const posts = await Post.find({ owner: userId })

        if (posts.length === 0) {
            return res.status(404).json({ success: false, error: 'No posts found for this user' });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, error: 'Error fetching posts' });
    }
};
