const { Router } = require("express");

const { addUser } = require("./controller.js");

const router = Router();

// post request to add a user

router.post("/", addUser);

module.exports = router;
