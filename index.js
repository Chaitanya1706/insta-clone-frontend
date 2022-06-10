// Started this project on 31st May 2022

const { Router } = require('express');
const express = require('express');
const app = express();
const db = require('./config/mongoose');

app.use(express.json());

app.use('/',require('./routes/index'));

const User = require('./models/user');

app.get('/',(req,res)=>{
    res.send("Hi...How are you??")
})

app.listen(5000,()=>{
    console.log("Server is up and Running at Port 5000");
})