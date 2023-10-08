const bcrypt = require("bcrypt");
const User = require("./UserModel");

const registeUser = async (req, res) => {
  const { userName, password, email, role } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userCreated = await new User({
      username: userName,
      password: hashedPassword,
      email,
      role,
    }).save();
    res.status(201).json(userCreated);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const getUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

module.exports = {
  registeUser,
  getUsers,
  getUserbyId,
};
