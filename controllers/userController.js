const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {

  async createNewUser(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
      }

      const existingUser = await User.findOne({ username: username });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "Account with this username already exists." });

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail)
        return res
          .status(400)
          .json({ msg: "Account with this email already exists." });

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
      }

      const user = await User.findOne({ username: username });
      if (!user)
        return res.status(400).json({ error: "Invalid username or password." });

      const verifyPassword = await bcrypt.compareSync(password, user.password);
      if (!verifyPassword)
        return res.status(400).json({ error: "Invalid username or password." });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {expiresIn: 3600});
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          password: user.password
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  protected(req, res) {
    res.send("hello user");
  },
};
