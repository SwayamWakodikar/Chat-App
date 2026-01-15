import User from "../models/userModel.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ name: username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    
    const hashedPassword = password; 
    
    const user = await User.create({
      email,
      name: username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    
    const isPasswordValid = password === user.password;
    
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const quickLogin = async (req, res, next) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ name: username });
    
    if (!user) {
        // Create new user with valid dummy data since strict schema might demand it
        // The current schema requires email and password
        user = await User.create({
            name: username,
            email: `${username}@test.com`,
            password: "defaultpassword" 
        });
    }
    
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
