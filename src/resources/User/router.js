const { Router } = require("express");

const { addUser, findAllUsers } = require("./controller.js");

const router = Router();

// post request to add a user

router.post("/", addUser);
router.get("/", findAllUsers);

module.exports = router;
