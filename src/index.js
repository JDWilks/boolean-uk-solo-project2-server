require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const userRouter = require("./resources/User/router");
const nftArtRouter = require("./resources/NFTArt/router");
const tradeRouter = require("./resources/Trade/router");
const walletRouter = require("./resources/Wallet/router");

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* SETUP ROUTES */

// here the requests come in from the front end and choose which router to look for instructions

// any fetch from /user is directed to use the userRouter
app.use("/user", userRouter);
// any fetch from /nftArt is directed to use the nftArtRouter
app.use("/nftArt", nftArtRouter);
// any fetch from /trade is directed to use the tradeRouter
app.use("/trade", tradeRouter);
// any fetch from /wallet is directed to use the walletRouter
app.use("/wallet", walletRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
