const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

const users = [
    {
        "dept": "cse",
        "start": 2005001,
        "end":   2005120
    },
    // {
    //     "dept": "eee",
    //     "start": 2006001,
    //     "end":   2006195
    // },
    // {
    //     "dept": "bme",
    //     "start": 2018001,
    //     "end":   2018050
    // },
    // {
    //     "dept": "me",
    //     "start": 2010001,
    //     "end":   2010180
    // },
    // {
    //     "dept": "name",
    //     "start": 2012001,
    //     "end":   2012055
    // },
    // {
    //     "dept": "ipe",
    //     "start": 2008001,
    //     "end":   2008120
    // },
    // {
    //     "dept": "ce",
    //     "start": 2004001,
    //     "end":   2004195
    // },
    // {
    //     "dept": "wre",
    //     "start": 2016001,
    //     "end":   2016030
    // },
    // {
    //     "dept": "mme",
    //     "start": 2011001,
    //     "end":   2011060
    // },
    // {
    //     "dept": "che",
    //     "start": 2002001,
    //     "end":   2002120
    // },
    // {
    //     "dept": "arch",
    //     "start": 2001001,
    //     "end":   2001060
    // },
    // {
    //     "dept": "urp",
    //     "start": 2015001,
    //     "end":   2015030
    // }
]

const EXTENSION = ".buet.ac.bd" ;

function generateRandomPassword() {
  return crypto.randomBytes(8).toString('hex'); // Generate a random password
}


async function main(){

    for(i in users){
        const dept = users[i].dept ;
        const start = users[i].start ;
        const end = users[i].end ;

        console.log(dept,start,end) ;

        for(j=start;j<=end;j++){

            const email = j+"@"+dept+EXTENSION ;
            const password = generateRandomPassword();

            console.log(j,email,password);

        }
        
    }
}


main().then(()=>{
    console.log("loaded successfully");
}).catch((err)=>{
    console.log("error: " + err)
}).finally(()=>{
    prisma.$disconnect();
})