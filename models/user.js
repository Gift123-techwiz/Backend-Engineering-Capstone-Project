const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    failedLoginAttempts:{
        type: Number,
        default: 0
    },
    lockUntil:{
        type: Date,
        default: null
    },
    failedLoginWindowStart: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;