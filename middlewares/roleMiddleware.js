const authorize = (...roles) => {
   return async (req, res, next) =>{
        
        const activityLog = require("../models/activityLog");

        if(!roles.includes(req.user.role)){
            //log unauthorized access attempt
            await activityLog.create({
                action: "Unauthorized access attempt",
                user: req.user.email,
                ipAddress: req.ip
            });           
            
            return res.status(403).json({message: "Yellooo, You don't have permission to access this feature"});
        }
        next();
    }
}

module.exports = authorize;