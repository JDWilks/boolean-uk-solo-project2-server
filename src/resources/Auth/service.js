const prisma = require("../../../utils/database");
const bcrypt = require("bcrypt");

const findUserWithValidation = async (userData) => {
  // below asks prisma to look in the user table and find a unique email which matches the userdata.email (sent from the body)
  const foundUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  // if no user is found throw the error
  if (!foundUser) throw new Error("Username/Password is incorrect");
  // below: here bcrypt compares userData.password (from body) with foundUser.password with is the incrypted version in the database
  const isPasswordValid = await bcrypt.compare(
    userData.password,
    foundUser.password
  );
  // if the encrypted password doesnot match the given password throw the below error
  if (!isPasswordValid) throw new Error("Username/Password is incorrect");
  // if email and password match return the founduser
  return foundUser;
};

module.exports = { findUserWithValidation };
