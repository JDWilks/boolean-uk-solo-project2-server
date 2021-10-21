const prisma = require("../../../utils/database");

// post request to buy nft

function tradeNft(req, res) {
  const tradeNftArt = req.body;
  console.log("tradeNftArt", tradeNftArt);
  prisma.trade
    .create({ data: tradeNftArt })
    .then((data) => {
      console.log(data);
      res.json({ data });
    })
    .catch((error) => {
      console.log(error);
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
