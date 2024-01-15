const { Worker } = require("bullmq")

const commentWorker = new Worker('comment-queue', async (job) => {
    const data = job.data;
    const userId = data.userId;
    const message = data.message;
    const post = data.post;
    post.comments.push({

        identity: userId,
        message: message
    });
    await post.save();

},{
    connection: {
        host: 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port: 15321,
        username: 'default',
        password: 'AVNS_Olz6GzOd0Dpv5QR306v'
    },
    concurrency:10
});

module.exports = commentWorker;

