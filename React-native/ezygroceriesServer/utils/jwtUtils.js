import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1m" });
};

const verifyToken = (authToken) => {
    return new Promise((resolve, reject)=>{
        const verified = jwt.verify(authToken, secret)
        verified ? resolve(true) : reject(false);
    })
}

export {generateToken, verifyToken};
