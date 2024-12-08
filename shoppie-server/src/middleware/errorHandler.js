const { constants } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.status(statusCode).json({
                
                title: "Internal Server Error",
                message: err.message,
               
            });
            break;
    }
};

module.exports = errorHandler;

