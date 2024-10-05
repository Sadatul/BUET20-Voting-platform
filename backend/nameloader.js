const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const csv = require("csv-parser");

const names = [];

function readCsvFile(filePath) {
    
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
  const filePath = "namelist.csv"; // Replace with the actual file path

  readCsvFile(filePath)
    .then((names) => {
      console.log(names[0]);
    })
    .catch((error) => {
      console.error("Error reading CSV file:", error);
    });
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
