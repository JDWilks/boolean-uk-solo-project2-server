const { Router } = require("express");

const { loginUser } = require("./controller");

const router = Router();

// login

router.route("/login").post(loginUser);

module.exports = router;
