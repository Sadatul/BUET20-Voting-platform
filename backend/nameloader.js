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

  // Read the CSV file to get the names array
  const names = await readCsvFile(filePath);

  // Loop through the names array and check for duplicates before inserting
  for (let i = 0; i < names.length; i++) {
    const name = names[i].name;
    const meaning = names[i].meaning;

    console.log(name, meaning);

    // Check if the name already exists in the database
    const existingName = await Names.findUnique({
      where: { name: name },
    });

    // If the name already exists, skip it
    if (existingName) {
      console.log(`Name "${name}" already exists. Skipping...`);
      continue; // Move to the next iteration
    }

    // If the name doesn't exist, create a new record
    await Names.create({
      data: {
        name: name,
        meaning: meaning,
      },
    });

    console.log(`Inserted "${name}" successfully.`);
  }

  console.log("All valid names have been processed.");
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
