const { Worker } = require("bullmq");

const followWorker = new Worker('follow-queue', async (job) => {
    try {
        const data = job.data;
        const followerId = data.followerId;
        const followingUserId = data.followingUserId;

        await User.findByIdAndUpdate(followerId, { $push: { followers: followingUserId } });
        await User.findByIdAndUpdate(followingUserId, { $push: { following: followerId } });
    } catch (error) {
        console.error("Error processing follow task:", error);
        // Log the error or handle it as necessary
    }
}, {
    connection: {
        host: 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port: 15321,
        username: 'default',
        password: 'AVNS_Olz6GzOd0Dpv5QR306v'
    },
    concurrency: 10
});

module.exports = followWorker;
