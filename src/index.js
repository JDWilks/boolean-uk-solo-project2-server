require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const userRouter = require("./resources/User/router");
const nftArtRouter = require("./resources/NFTArt/router");
const tradeRouter = require("./resources/Trade/router");
const walletRouter = require("./resources/Wallet/router");
const authRouter = require("./resources/Auth/router");

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors({ origin: process.env.FRONTENDURL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* SETUP ROUTES */

// middleware to check if you have a token - if you don't you can't access trade route

const authMiddleWare = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    res.status(403).json({
      error: "No authorization Header Provided",
    });
    return;
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  jwt.verify(token, "somethingblah", (error, decoded) => {
    if (decoded) {
      next();
    }
    if (error) {
      res.status(403).json({
        error: "No authorization Header Provided",
      });
    }
  });

  // console.log("cookies req", req.cookies);
  // if (!req.cookies.token) {
  //   res.json({ message: "no token in cookie" });
  //   return;
  // }
  // console.log("req.cookies.token...", req.cookies.token);
  // const userData = jwt.verify(req.cookies.token, "somethingblah");
  // console.log("userData", userData);

  // if (userData) {
  //   console.log("inside if statement");
  //   req.currentUser = userData;
  //   return next();
  // }
  // res.json({ message: "if user not autherised" });
};

// here the requests come in from the front end and choose which router to look for instructions

// any fetch from /user is directed to use the userRouter
app.use("/user", userRouter);
// any fetch from /nftArt is directed to use the nftArtRouter
app.use("/nftArt", nftArtRouter);
// any fetch from /trade is directed to use the tradeRouter
app.use("/trade", authMiddleWare, tradeRouter);
// any fetch from /wallet is directed to use the walletRouter
app.use("/wallet", walletRouter);
// this is the special auth route for checking passwords
app.use(authRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
