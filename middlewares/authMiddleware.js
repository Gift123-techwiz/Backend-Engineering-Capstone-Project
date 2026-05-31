const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try{
        //store authorization header from the request
        const authHeader = req.headers.authorization;

        //reject request if no header
        if(!authHeader){
            return res.status(401).json({message: "No token provided"});
        }

        //split to take just the token
        const token = authHeader.split(" ")[1];

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //store decoded user so that the next middleware//route can know which user made a request
        req.user = decoded;

        //move to the next middleware handler
        next();
    }catch(err){
        return res.status(401).json({message: "Token expired or invalid"});
    }
};

module.exports = protect;