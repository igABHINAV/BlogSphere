const User = require("../../models/User");
const Post = require("../../models/Post");
const  {Queue} = require('bullmq');


const likeQueue = new Queue('like-queue' , {
    connection :{
        host : 'redis-1360dc07-abhinav2003feb-6321.a.aivencloud.com',
        port : 15321 ,
        username : 'default',
        password : 'AVNS_Olz6GzOd0Dpv5QR306v'
    }
})

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);
        if (!post) {
            res.status(401).json({
                message: "no post exist !"
            });
        }

        await likeQueue.add(`${Date.now()} + ${req.user.userId}` ,{
            userId : req.user.userId ,
            post : post
        } )

        // if (post.likes.includes(req.user.userId)) {
        //     const index = post.likes.indexOf(req.user.userId);
        //     post.likes.splice(index, 1);
        //     await post.save();
        //     res.status(201).json({
        //         message: "post unliked"
        //     });
        // }
        // post.likes.push(req.user.userId);
        // await post.save();
        // res.status(201).json({
        //     message: "post liked !"
        // })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

