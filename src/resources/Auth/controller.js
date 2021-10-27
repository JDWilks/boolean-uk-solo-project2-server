const { findUserWithValidation } = require("./service");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  // get user passowrd / username
  const userCreds = req.body;

  try {
    // check if credentials are valid
    const loggedUser = await findUserWithValidation(userCreds);
    // creating jwt token
    const token = jwt.sign(
      { id: loggedUser.id, firstName: loggedUser.firstName },
      "somethingblah"
    );
    // setting cookie
    res.cookie("token", token, { httpOnly: true });

    // handling result and only giving back the id and userName
    res.json({ user: { id: loggedUser.id, firstName: loggedUser.firstName } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { loginUser };
