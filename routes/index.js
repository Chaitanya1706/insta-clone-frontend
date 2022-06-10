const exp = require('constants');
const express = require('express');
const requireLogin = require('../middleware/requireLogin');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/',homeController.home);

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hi I am protected");
})

router.use('/user',require('./user'));

router.use('/post',require('./post'));

module.exports = router;