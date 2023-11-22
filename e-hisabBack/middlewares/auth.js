const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
    }
    const secret = process.env.JWT_SEC;

    jwt.verify(token, secret)
    try {
        const decoded = jwt.verify(token, secret);
        req.body.user = decoded;
      } catch (err) {

        return res.status(401).json({ message: 'Unauthorized: invalid JWT token' });
        return false;
      }
      return next();

   
};

module.exports = verifyToken;