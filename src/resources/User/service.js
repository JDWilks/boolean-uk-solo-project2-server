const prisma = require("../../../utils/database");
const bcrypt = require("bcrypt");

const createWithHash = async (newUser) => {
  // grab user plaintext password
  const plaintext = newUser.password;
  // hash the password using bycrypt (8 rounds for speed) (it will return a promise)
  const hashedPassword = await bcrypt.hash(plaintext, 8);

  // make sure to save the hasged password
  const createdUser = await prisma.user.create({
    data: { ...newUser, password: hashedPassword },
  });
  return createdUser;
};

module.exports = {
  createWithHash,
};
