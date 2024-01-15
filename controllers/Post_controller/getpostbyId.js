const User = require("../../models/User");
const Post = require("../../models/Post");

exports.getPostById = async (req, res) => {
    const postId = req.body.id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching post' });
    }
};