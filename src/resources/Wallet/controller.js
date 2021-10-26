const prisma = require("../../../utils/database");

// getting all wallet info including the user

function getWallet(req, res) {
  prisma.wallet
    .findMany({
      include: {
        user: true,
      },
    })
    .then((allWallets) => res.json(allWallets));
}

module.exports = { getWallet };

//
