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
    const token = jwt.sign(
      { id: loggedUser.id, firstName: loggedUser.firstName },
      "somethingblah"
    );
    // setting cookie
    res.cookie("token", token);

    // handling result and only giving back info needed (need wallet)
    res.json({
      user: {
        id: loggedUser.id,
        firstName: loggedUser.firstName,
        email: loggedUser.email,
        role: loggedUser.role,
        wallet: loggedUser.wallet,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// logging out the user - max age is setting the cookie life span to 1 millisecond then rerendering the home page

const logoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};

// validateCookie is used in the useEffect in the front end within app.js
// it basically recieves the cookie from the front end
// decodes it to get id and firstname
// uses prisma to find that person in the database using id
// then responds to the front end with their id / firstname / email / role (which is all the info we need to setCurrentUser - this is defined in our front end store)

const validateCookie = (req, res) => {
  // from the front end we get the cookie (through credentials) which we are storing here
  const cookie = req.cookies.token;
  // we then use jwt.verify which takes 1.the cookie 2.the special word and 3.a function
  // the funciton takes a error and decoded - decoded gives us the info stored within the cookie which is the id and firstname - you can see this on line 15 where we create the cookie
  jwt.verify(cookie, "somethingblah", function (err, decoded) {
    console.log("decoded", decoded);
    prisma.user
      .findUnique({
        where: {
          id: decoded.id,
        },
      })
      .then((user) =>
        res.json({
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        })
      );
  });

  console.log("cookies...", req.cookies);
};

module.exports = { loginUser, logoutUser, validateCookie };
