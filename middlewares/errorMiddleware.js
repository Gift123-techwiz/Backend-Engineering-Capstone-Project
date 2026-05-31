//handle not found routes
const notFound = (req,res,next)=>{
    res.status(404).json({message:  `Route Not Found - ${req.originalUrl}`});

};

//catch application errors and return the right status code and error message
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message
    });
};

module.exports = {
    notFound,
    errorHandler
};