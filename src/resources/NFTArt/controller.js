const prisma = require("../../../utils/database");

// post request to create a nft card

function createNftArt(req, res) {
  const newNft = req.body;
  console.log(req, newNft);
  prisma.nftArt
    .create({
      data: {
        ...newNft,
        price: parseFloat(newNft.price),
      },
    })
    .then((newNft) => {
      console.log("newNft", newNft);
      res.json(newNft);
    })
    .catch((error) => {
      res.json(error);
    });
}

//

// get request here we are receiving the request - telling prisma to findmany within nftArt the then return these as json to the front end

function findAllNftArt(req, res) {
  prisma.nftArt.findMany().then((allNfts) => res.json(allNfts));
}

// get request to find one nft

function findOneNft(req, res) {
  const id = req.params.id;
  prisma.nftArt
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((art) => {
      res.json(art);
    })
    .catch((error) => {
      res.json(error);
    });
}

// patch request to update a nft card

function updateNftArt(req, res) {
  const updatedNft = req.body;
  const id = req.params.id;
  console.log(updatedNft);
  prisma.nftArt
    .update({
      where: { id: id },
      data: {
        ...updatedNft,
        price: updatedNft.price ? parseFloat(updatedNft.price) : 0.0,
      },
    })
    .then((updatedNft) => {
      res.json({ updatedNft });
    })
    .catch((error) => {
      res.json({ msg: "...your amendNft backend blew up" });
    });
}

// delete request to delete nft card

function deleteNftArt(req, res) {
  const id = req.params.id;
  prisma.nftArt
    .delete({
      where: { id: id },
    })
    .then((user) => res.json({ msg: `you deleted meeeee @ id no ${id}` }));
}

module.exports = {
  createNftArt,
  findAllNftArt,
  updateNftArt,
  deleteNftArt,
  findOneNft,
};

//
