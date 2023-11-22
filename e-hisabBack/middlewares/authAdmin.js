
const jwt = require("jsonwebtoken");

const verifyTokenAdmin = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
  }
  
  const secret = process.env.JWT_SEC;

  try {
      const decoded = jwt.verify(token, secret);
      
      if (decoded.isAdmin===true) {
          req.body.user = decoded;
          return next();
      } else {
          return res.status(403).json({ message: 'Forbidden: User is not an admin' });
      }
  } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid JWT token' });
  }
};

module.exports = verifyTokenAdmin;