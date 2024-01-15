const User = require("../../models/User");
const Post = require("../../models/Post");

exports.UploadPost = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            caption: req.body.caption,
            owner: req.user.userId
        };

        // Create a new post
        const post = await Post.create(data);

        // Find the user and update the posts array
        const admin = await User.findById(req.user.userId);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        admin.posts.push(post);

        // Save the user with the updated posts array
        await admin.save();

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post,
            admin,
        });
    } catch (error) {
        console.error("Error creating/uploading post:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
