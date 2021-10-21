const { Router } = require("express");

const { tradeNft, getNft } = require("./controller.js");

const router = Router();

// post request to trade a nft

router.post("/", tradeNft);
router.get("/", getNft);

module.exports = router;
