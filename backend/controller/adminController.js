const {PrismaClient} = require('@prisma/client');
const {decryptLink} = require('../utils/link-generator');
const prisma = new PrismaClient(); 

async function verifyLink(req,res){

    const link = req.params.link ;

    console.log('link',link);

    console.log(decryptLink(link));
}


module.exports = {
    verifyLink
}