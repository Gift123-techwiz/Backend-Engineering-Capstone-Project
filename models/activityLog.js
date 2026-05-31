const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
    },
    user:{
        type: String,
    },
    ipAddress:{
        type: String
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);