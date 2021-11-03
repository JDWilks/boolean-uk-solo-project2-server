const prisma = require("../../../utils/database");

// post request to buy nft
// need to check wallet
// find user in cookie > compare wallet amount to trade
function tradeNft(req, res) {
  // takes the body from the front end request
  const tradeNftArt = req.body;
  console.log("tradeNftArt", tradeNftArt);
  prisma.trade
    .create({ data: tradeNftArt })
    .then((data) => {
      console.log("data", data);
      res.json({ data });
    })
    .catch((error) => {
      console.log("tradenft error", error);
      res.json(error);
    });
}

// getting all trade info including the user and nft information for the table in the front end

function getNft(req, res) {
  prisma.trade
    .findMany({
      include: {
        user: true,
        nft: true,
      },
    })
    .then((allTrades) => res.json(allTrades));
}

module.exports = { tradeNft, getNft };

//
