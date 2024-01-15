const express = require("express");
const { login } = require("../controllers/User_controller/Login");
const { signup } = require("../controllers/User_controller/Signup");
const router  = express.Router();
router.route("/login").post(login);
router.route("/signup").post(signup);
module.exports = router;