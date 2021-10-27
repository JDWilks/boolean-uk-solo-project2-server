const prisma = require("../../../utils/database");
const bcrypt = require("bcrypt");

const findUserWithValidation = async (userData) => {
  const foundUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!foundUser) throw new Error("Username/Password is incorrect");
  // below: here bcrypt compares userData.password (from body) with foundUser.password with is the incrypted version in the database
  const isPasswordValid = await bcrypt.compare(
    userData.password,
    foundUser.password
  );

  if (!isPasswordValid) throw new Error("Username/Password is incorrect");

  return foundUser;
};

module.exports = { findUserWithValidation };
