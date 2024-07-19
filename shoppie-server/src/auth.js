const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          throw new Error("User is not authorized");
        }
        req.user = decoded.custId; 
        next();
      });

    } else {
      throw new Error("User is not authorized or token is missing");
    }
  } catch (error) {
    // Handle errors
    res.status(401).json({ message: error.message });
  }
});


const refresh = asyncHandler(async (req, res, next) => {
  console.log("inside the refresh toekn")
  const { token } = req.body;

  if (!token) {
      return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({
          user: {
              firstName: decoded.user.firstName,
              lastName: decoded.user.lastName,
              custId: decoded.user.custId,
          }
      }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1m'
      });

      return res.status(200).json({ accessToken });
  } catch (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

module.exports = validateToken,refresh;
