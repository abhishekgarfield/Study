const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR: ",err.message);
    res.status(500).send("Internal server error");
}

export default errorMiddleware;
