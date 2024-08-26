import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    resolve(jwt.sign(payload, secret, { expiresIn: "10y" }));
  });
};

const verifyToken = (authToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const verified = jwt.verify(authToken, secret);
      verified ? resolve(true) : reject(false);
    } catch (err) {
      console.log("---errr---", err);
      reject(false);
    }
  });
};

export { generateToken, verifyToken };
