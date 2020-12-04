const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) return res.status(401).json({ error: 'No Authorization found.'})
  
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if(err){
      return res.status(401).json({ error: 'Token not verified'})
    } 
    const { id } = payload;
     User.findById(id)
     .select("-password").select("-createdAt").select("-updatedAt")
     .then(userdata => {
      req.user = userdata
      next()
    })
  })

}
