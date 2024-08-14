import { verifyToken } from "../../utils/jwtUtils.js"

const skip_before_auth = (url) =>{
    const skip_urls = ['/employees/login', '/employees/signup' ,'/shops/getallshops']
    return skip_urls.includes(url)
}

const authMiddleware = (req, res, next) => {
    if(!skip_before_auth(req.url)){
        const authToken = req.header(process.env.JWT_HEADER_KEY)
        verifyToken(authToken) ? next() : res.code(401).send('AUTHENTICATON FAILED.')
    }
    next();
}


export default authMiddleware;
