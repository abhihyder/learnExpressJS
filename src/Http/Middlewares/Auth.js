const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const auth_user = {
      email: decoded.email,
      id: decoded.id,
    };
    req.auth_user = auth_user;
    next();
  } catch (err) {
    res.status(401);
    next("Unauthorized!");
  }
};

module.exports = auth;
