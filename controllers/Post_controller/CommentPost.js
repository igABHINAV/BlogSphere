const User = require("../../models/User");
const Post = require("../../models/Post");
const { Queue } = require('bullmq');

const commentQueue = new Queue('comment-queue', {
    connection: {
        host: 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port: 15321,
        username: 'default',
        password: 'AVNS_Olz6GzOd0Dpv5QR306v'
    }
})

exports.commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        if (!post) {
            return res.status(401).json({
                message: "No post exists!"
            });
        }

        await commentQueue.add(`${Date.now()} + ${req.user.userId}`, {
            userId: req.user.userId,
            post: post,
            message: req.body.message
        })

        res.status(200).json({
            message: "Comment added successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
