// middleware.js

const logger = (req, res, next) => {
    console.log(` [${new Date().toISOString()}]${req.method} ${req.path}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = { logger, errorHandler };
