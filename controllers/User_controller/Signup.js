
const User = require("../../models/User");
exports.signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists!",
            });
        }

        user = await User.create({ name, username, password });

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};