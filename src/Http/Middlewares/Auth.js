const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const auth_user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    req.auth_user = auth_user;
    next();
  } catch (err) {
    res.status(401);
    next("Unauthorized!");
  }
};

module.exports = auth;
