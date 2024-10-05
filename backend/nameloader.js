const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const csv = require("csv-parser");

const names = [];

async function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        names.push({
          name: row.name,
          meaning: row.meaning,
        });
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(names);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  const filePath = "namelist.csv";

  const Names = prisma.name;

  const names = await readCsvFile(filePath);

  for (let i = 0; i < names.length; i++) {
    const name = names[i].name;
    const meaning = names[i].meaning;

    console.log(name, meaning);

    // await Names.create({
    //   data: {
    //     name: name,
    //     meaning: meaning,
    //   },
    // });
  }
}

main()
  .then(() => {
    console.log("loaded successfully");
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    prisma.$disconnect();
  });
