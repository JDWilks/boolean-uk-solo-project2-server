const { findUserWithValidation } = require("./service");

const loginUser = async (req, res) => {
  // get user passowrd / username
  const userCreds = req.body;

  try {
    // check if credentials are valie
    const loggedUser = await findUserWithValidation(userCreds);
    // handling result and only giving back the id and userName
    res.json({ user: { id: loggedUser.id, firstName: loggedUser.firstName } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { loginUser };
