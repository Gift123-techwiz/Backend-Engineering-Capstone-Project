const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try{
        //check if all fields are provided
        if(!fullName || !email || !password || !role){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //add new user to database
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        return res.status(201).json({message: `User ${newUser.fullName} registered successfully`});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        //check if all fields are provided
        if(!email || !password){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        //check if user exsists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }

        //check if account is locked
        if(user.lockUntil && user.lockUntil > Date.now()){
            return res.status(423).json({message: "Account locked. Try again later."});
        }

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            const now = new Date();

            //reset failed attempts to 1 if we are outside the 10 minute window, otherwise increment failed attempts
            if(!user.failedLoginWindowStart || now - user.failedLoginWindowStart > 10 * 60 * 1000){
                user.failedLoginAttempts = 1;
                user.failedLoginWindowStart = now;
            }else{
                user.failedLoginAttempts++;
            }

            //lock account for 15mins after 5 failed attempts within the 10 minute window
            if(user.failedLoginAttempts >= 5){
                user.lockUntil = new Date(now.getTime() + 15 * 60 *1000);
                await user.save();
                return res.status(423).json({message:"Account locked for 15minutes"});
            }


            await user.save();
            return res.status(401).json({message: "Invalid credentials"});
        }

        //reset everything after logging in successfully
        user.failedLoginAttempts = 0;
        user.failedLoginWindowStart = null;
        user.lockUntil = null;

        await user.save();

        //generate token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});

        return res.status(200).json({message: "Login successful", token, user:{
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
};

const getProfile = async (req, res) => {
    try{
        //return res.status(200).json({message: "Profile fetched successfully", user: req.user});
        const user = await User.findById(req.user.id).select("-password");
        return res.status(200).json({message: "Profile fetched successfully", user});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
};

const getReports = async (req, res)=>{
    try{
        return res.status(200).json({message: "Reports fetched successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    try{
        if(req.user.id === id){
            return res.status(403).json({message: "Admin cannot delete themselves"});
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({message: `User ${user.fullName} deleted successfully`});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
}

const promoteUser = async (req, res) => {
    const {id} = req.params;

    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(user.role === "admin"){
            return res.status(400).json({message: "Cannot promote another admin"});
        }

        if(user.role === "moderator"){
            user.role = "admin";
        }else if(user.role === "user"){
            user.role = "moderator";
        }

        await user.save();
        return res.status(200).json({message: `User ${user.fullName} promoted successfully`, user});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getReports,
    deleteUser,
    promoteUser
};