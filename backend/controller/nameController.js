const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const Name = prisma.name;


async function getAllNames(req,res){

    console.log('fetching all names...');

    const names = await Name.findMany();

    console.log(names);

    return res.json(names);
}


module.exports = {
    getAllNames
}