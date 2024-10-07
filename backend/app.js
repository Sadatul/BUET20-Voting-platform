const express = require('express');
const cors = require('cors');
require('dotenv').config()
const adminRouter = require('./router/adminRouter');
const nameRouter = require('./router/nameRouter');

const app = express();
app.use(express.json());
app.use(cors());

PORT = process.env.PORT || 3000;

app.listen(PORT,"localhost",()=>{
    console.log("listening on port "+PORT);
});

app.use('/name',nameRouter);
app.use('/admin',adminRouter);

app.use('/',(req,res)=>{
    res.json("welcome to voting");
})
