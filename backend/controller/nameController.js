const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllNames(req, res) {
  const { sid, email, isAdmin } = req.user;

  console.log("request made by ", sid);

  const Name = prisma.name;

  console.log("fetching all names...");

  const names = await Name.findMany();

  // console.log(names);

  console.log(req.headers.token);

  return res.json(names);
}

async function castVote(req, res) {
  const Name = prisma.name;
  const User = prisma.user;

  const { sid } = req.user;

  const options = req.body.options;
  // contains an array of id of names like below
  // [
  //     '988ea80a-6148-4351-a4b9-c7a2556bd58a',
  //     '9c89166e-ebe2-487e-82ec-021ef0e7577f',
  //     'fa71b36d-c7fb-42e0-8a38-451fa10e9d23'
  //   ]

  console.log(options);
}

module.exports = {
  getAllNames,
  castVote,
};
