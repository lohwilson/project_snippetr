const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const SALT_ROUND = 10;

module.exports = {
  loginPage(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
  },

  // async createNewUser(req, res) {
  //   try {
  //     await User.findOne(
  //       { username: req.body.username },
  //       function (err, existingUser) {
  //         console.log(req.body.username);
  //         if (existingUser === null) {
  //           req.body.password = bcrypt.hashSync(
  //             req.body.password,
  //             bcrypt.genSaltSync(SALT_ROUND)
  //           );
  //           User.create(req.body);
  //         } else {
  //           return res.status(400).json({ msg: "username already exist" });
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     console.log("404 errror", err);
  //   }
  // },

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
        return res
          .status(400)
          .json({ error: "Invalid username or password." });

      if (bcrypt.compareSync(password, user.password)) {
        res.json({message: "successfully logged in"})
      } else {
        return res
        .status(400)
        .json({ error: "Invalid username or password." });
      }

      // const user = await User.findOne({ username: username });
      // if (bcrypt.compareSync(password, user.password)) {
      //   return "successfully logged in";
      // } else {
      //   return "error loggin in 2";
      // }
    } catch (err) {
      return "error logging in 1", err;
    }
  },
};
