import { verifyToken } from "../../utils/jwtUtils.js";

const skip_before_auth = (url) => {
  const skip_urls = [
    "/employees/login",
    "/employees/signup",
    "/shops/getallshops",
    "/employees/verifyotp",
    "/employees/resendotp",
    "/shops/getshop",
  ];
  return skip_urls.includes(url);
};

const authMiddleware = async (req, res, next) => {
  try {
    if (!skip_before_auth(req.url)) {
      const authToken = req.header(process.env.JWT_HEADER_KEY);
      (await verifyToken(authToken))
        ? next()
        : res.code(401).send("AUTHENTICATON FAILED.");
    } else {
      next();
    }
  } catch (err) {
    res.code(401).send("AUTHENTICATON FAILED.");
  }
};

export default authMiddleware;
