const { Router } = require("express");

const { loginUser, logoutUser } = require("./controller");

const router = Router();

// login

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

module.exports = router;
