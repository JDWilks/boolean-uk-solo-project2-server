const { Router } = require("express");

const { loginUser, logoutUser, validateCookie } = require("./controller");

const router = Router();

// login

router.route("/login").post(loginUser);

// logout route

router.route("/logout").get(logoutUser);

// validate cookie route

router.route("/cookie").get(validateCookie);

module.exports = router;
