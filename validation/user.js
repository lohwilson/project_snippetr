const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");

// module.exports = (req, res, next) => {
//   const token = req.header("x-auth-token");
//   // check for token
//   if (!token) res.status(401).json({ error: "No token, authorization denied" });

//   try {
//     // verify token
//     const decoded = jwt.verify(token, JWT_SECRET, (err, payload));
//     console.log(decoded);
//     // add user from payload
//     req.user = decoded;
//     console.log(req.user);
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: 'Token is not valid'})
//   }
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) return res.status(401).json({ error: 'You must be logged in.1'})
  
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err) return res.status(401).json({ error: 'You must be logged in.2'})


    const { _id } = payload;
     User.findById(_id).then(userdata => {
      req.user = userdata
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',req.user)
      next()
    })
  })

}
