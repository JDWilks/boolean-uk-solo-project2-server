const { wallet } = require("../../../utils/database");
const prisma = require("../../../utils/database");
const { createWithHash } = require("./service");
const jwt = require("jsonwebtoken");

// backend receives request from front end
// post request to add a user which also creates a wallet for them with 1000 etherium

async function addUser(req, res) {
  try {
    const newUser = req.body;
    // this is my modifiyed create verstion coming from service with password hashing
    const createdUser = await createWithHash(newUser);
    const createdWallet = await prisma.wallet.create({
      data: {
        coin: "Etherium",
        amount: 1000,
        userId: createdUser.id,
      },
    });
    console.log("wallet", createdWallet);

    jwt.sign(
      { id: createdUser.id, firstName: createdUser.firstName },
      "somethingblah",
      (error, token) => {
        res.json({
          user: {
            id: createdUser.id,
            firstName: createdUser.firstName,
            email: createdUser.email,
            role: createdUser.role,
            wallet: createdUser.wallet,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log("error", error);

    res.json(error);
  }
}

const findAllUsers = async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: { wallet: true },
  });
  res.json({ data: allUsers });
};

module.exports = { addUser, findAllUsers };
