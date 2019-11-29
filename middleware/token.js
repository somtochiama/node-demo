const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: "No authorization headers found"
    })
  } else {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return next(err);
      } else {
        console.log(decoded)
        req.admin = decoded.isAdmin;
        next();
      }
    })
  }
}