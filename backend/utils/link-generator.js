const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

// Encryption key (use 32 bytes for AES-256)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

// Log to check the key length
// console.log("Key length:", ENCRYPTION_KEY.length); // This should output 32


const IV_LENGTH = 16; // AES block size

const csvWriter = createCsvWriter({
    path: 'linklist.csv',
    header: [
      { id: 'email', title: 'Email' },
      { id: 'link', title: 'Link' }
    ]
  });



// Function to encrypt text
function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Function to decrypt text
function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

// Function to generate the unique encrypted link for a user
function generateLink(user) {

  const baseUrl = process.env.BASE_URL ;
  
  // Concatenate sid, email, and password
  const plainText = `${user.sid}+${user.email}+${user.password}`;

  // Encrypt the concatenated string
  const encryptedLink = encrypt(plainText);

  // Return the complete URL
  return `${baseUrl}/?link=${encodeURIComponent(encryptedLink)}`;
}

// Function to retrieve sid, email, and password from an encrypted link
function decryptLink(encryptedLink) {

   encryptedLink = decodeURIComponent(encryptedLink);
  // Decrypt the encrypted link
  const decryptedText = decrypt(encryptedLink);

  // Split the decrypted text to get sid, email, and password
  const [sid, email, password] = decryptedText.split('+');

  // Return an object with the values
  return { sid, email, password };
}

// Function to write random links to a CSV file
async function writeRandomLinkToCsv() {
    try {
      // Fetch all users
      const users = await prisma.user.findMany();
      console.log("length: " + users.length);
  
      // Prepare the data to be written to the CSV
      const records = users.map(user => {
        const link = generateLink(user);
        return {
          email: user.email,
          link: link
        };
      });
  
      // Write the data to the CSV file
      await csvWriter.writeRecords(records);
      console.log("CSV file written successfully!");
  
    } catch (error) {
      console.error("Error writing to CSV:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

// Example usage
// const user = {
//   sid: 1234,
//   email: 'user@example.com',
//   password: 'securepassword123'
// };

// // Generate the link
// const link = generateLink(user);
// console.log('Generated Link:', link);

// Decrypt the link to retrieve user information
// const link = 'http://batch20voting.com/?link=8f1e0a12b4a0ed6b0027c0e22eba18b6%3A0aa30c0180175fdf6b192cff9efe4db51b20fb7c989e8a6095df70efbd2cadfcfd2b657b0031d8274050996a124f0aba';
// const encryptedLink = link.split('link=')[1]; // Get the encrypted part from the URL
// const userInfo = decryptLink(encryptedLink);
// console.log('Decrypted Info:', userInfo);

// comment out module.exports for a while and uncomment the following

// writeRandomLinkToCsv();

module.exports = { decryptLink } ;

// after you are done, kindly undo the process
