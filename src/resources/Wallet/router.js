const { Router } = require("express");

const { getWallet } = require("./controller.js");

const router = Router();

// get request to get all wallets

router.get("/", getWallet);

module.exports = router;
