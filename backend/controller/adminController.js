const { PrismaClient } = require("@prisma/client");
const { decryptLink } = require("../utils/link-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const prisma = new PrismaClient();

async function verifyLink(req, res) {
  const User = prisma.user;

  const link = req.params.link;

  console.log("link", link);

  // console.log(decryptLink(link));
  const { sid, email, password } = decryptLink(link);

  if (!sid || isNaN(sid) || !Number.isInteger(+sid)) {
    return res.status(400).json({
      success: false,
      message: "Not verified",
    });
  }

  console.log(sid, email, password);
  //  decrypted_info  {
  //     sid: '2015030',
  //     email: '2015030@urp.buet.ac.bd',
  //     password: '4346944891dc2c0c'
  //   }

  const user = await User.findUnique({
    where: {
      sid: +sid,
      email: email,
      password: password,
    },
  });

  if (!user) {
    return res.json({
      success: false,
      message: "Not verified",
    });
  }

  //user has been authenticated

  console.log(user);

  const token = jwt.sign(
    {
      sid: user.sid,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET, // Make sure this secret is securely stored in your environment variables
    { expiresIn: "2h" } // Token will expire in 2 hours
  );

  // Send the token in the response body
  return res.status(200).json({
    success: true,
    token: token, // Sending the token here
    isAdmin: user.isAdmin,
  });
}

module.exports = {
  verifyLink,
};
