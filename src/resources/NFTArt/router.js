const { Router } = require("express");

const {
  createNftArt,
  findOneNft,
  findAllNftArt,
  updateNftArt,
  deleteNftArt,
} = require("./controller.js");

const router = Router();

// the request from index.js is directed here and it looks for which method it needs to go the controller

router.post("/", createNftArt);
router.get("/", findAllNftArt);
router.get("/:id", findOneNft);
router.patch("/:id", updateNftArt);
router.delete("/:id", deleteNftArt);

module.exports = router;
