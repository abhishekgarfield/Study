const loggerMiddleware = (req, res, next) => {
    console.log("---request---",req)
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

export default loggerMiddleware;
