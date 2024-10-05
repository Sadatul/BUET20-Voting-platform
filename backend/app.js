const express = require('express');
require('dotenv').config()


const app = express();
app.use(express.json());

PORT = process.env.PORT || 3000;

app.listen(PORT,"localhost",()=>{
    console.log("listening on port "+PORT);
})

app.get('/',(req,res)=>{
    res.json("welcome to voting");
})
