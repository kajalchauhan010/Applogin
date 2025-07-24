
//new 
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        // new
        // const user = await User.findOne({name});
        // if(!user) return res.status(400).json({message:"User not found"});

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, role: user.role, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
