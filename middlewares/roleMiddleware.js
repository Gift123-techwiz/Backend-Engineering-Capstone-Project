const authorize = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: "Yellooo, You don't have permission to access this feature"});
        }
        next();
    }
}

module.exports = authorize;