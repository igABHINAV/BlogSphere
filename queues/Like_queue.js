const { Worker } = require("bullmq")

const likeWorker = new Worker('like-queue', async (job) => {
    const data = job.data
    const post = data.post
    const userId = data.userId
    if (post.likes.includes(userId)) {
        const index = post.likes.indexOf(userId);
        post.likes.splice(index, 1);
        await post.save();
    }
    post.likes.push(userId);
    await post.save();

}, {
    connection: {
        host: 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port: 15321,
        username: 'default',
        password: 'AVNS_Olz6GzOd0Dpv5QR306v'
    },
    concurrency:10
});
module.exports = likeWorker;