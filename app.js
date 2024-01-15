const express = require("express");
const cors = require("cors");

const app = express();
const likeWorker = require("./queues/Like_queue");
const commentWorker = require("./queues/Comment_queue");

if (process.env.NODE_ENV !== 'production')
    require("dotenv").config({ path: "./config/.env" });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require("./routes/User_route");
const postRoutes = require("./routes/Post_route");
const { authenticateToken } = require("./middlewares/Auth");

app.use("/user", userRoutes);
app.use("/post", authenticateToken,  postRoutes);

module.exports = app;
