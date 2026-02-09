// In-memory storage for users
const users = [];

export const register = async (req, res, next) => {
  // Not used in simplified mode
  return res.json({ status: false, msg: "Use Quick Login" });
};

export const login = async (req, res, next) => {
  // Not used in simplified mode
  return res.json({ status: false, msg: "Use Quick Login" });
};

export const quickLogin = async (req, res, next) => {
  try {
    const { username } = req.body;
    let user = users.find(u => u.name === username);
    
    if (!user) {
      user = {
        _id: Math.random().toString(36).substr(2, 9),
        name: username,
        email: `${username}@test.com`,
        avatarImage: "",
      };
      users.push(user);
      console.log(`New user created: ${username}`);
    } else {
      console.log(`User logged in: ${username}`);
    }
    
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const otherUsers = users.filter(u => u._id !== userId);
    return res.json(otherUsers);
  } catch (ex) {
    next(ex);
  }
};
