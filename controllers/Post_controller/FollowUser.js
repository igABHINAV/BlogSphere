const User = require("../../models/User");
const { Queue } = require("bullmq");

const FollowQueue = new Queue('follow-queue', {
    connection: {
        host: 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port: 15321,
        username: 'default',
        password: 'AVNS_Olz6GzOd0Dpv5QR306v'
    }
})

exports.followUser = async (req, res) => {
    try {
        const { iden } = req.body;

        const follower = await User.findById(req.user.userId);
        const followingUser = await User.findById(iden);

        if (!follower || !followingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await FollowQueue.add(`${Date.now()} + ${req.user.userId}`, {
            followerId: follower.userId,
            followingUserId: followingUser.userId
        });

        res.status(201).json({
            success: true,
            message: `${follower.username} is following ${followingUser.username}`,
        });
    } catch (error) {
        console.error("Error following user:", error);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
