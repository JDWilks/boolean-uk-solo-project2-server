const { findUserWithValidation } = require("./service");
const jwt = require("jsonwebtoken");

const prisma = require("../../../utils/database");

const loginUser = async (req, res) => {
  // get user passowrd / username
  const userCreds = req.body;

  try {
    // check if credentials are valid
    const loggedUser = await findUserWithValidation(userCreds);
    console.log("loggedUser", loggedUser);
    // creating jwt token with id and firstname and uses secret key
    jwt.sign(
      { id: loggedUser.id, firstName: loggedUser.firstName },
      "somethingblah",
      (error, token) => {
        res.json({
          user: {
            id: loggedUser.id,
            firstName: loggedUser.firstName,
            email: loggedUser.email,
            role: loggedUser.role,
            wallet: loggedUser.wallet,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// logging out the user - max age is setting the cookie life span to 1 millisecond then rerendering the home page

const logoutUser = (req, res) => {
  res.redirect("/");
};

// validateCookie is used in the useEffect in the front end within app.js
// it basically recieves the cookie from the front end
// decodes it to get id and firstname
// uses prisma to find that person in the database using id
// then responds to the front end with their id / firstname / email / role (which is all the info we need to setCurrentUser - this is defined in our front end store)

const validateCookie = (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    res.status(403).json({
      error: "No authorization Header Provided",
    });
    return;
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  jwt.verify(token, "somethingblah", function (err, decoded) {
    console.log("decoded", decoded);
    prisma.user
      .findUnique({
        where: {
          id: decoded.id,
        },
      })
      .then((loggedUser) => {
        res.json({
          user: {
            id: loggedUser.id,
            firstName: loggedUser.firstName,
            email: loggedUser.email,
            role: loggedUser.role,
            wallet: loggedUser.wallet,
          },
          token,
        });
      });
  });

  console.log("token...", token);
};

module.exports = { loginUser, logoutUser, validateCookie };
