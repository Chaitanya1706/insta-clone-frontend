const mongoose = require('mongoose');

const mongoURI = require('../keys').mogoURI;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to DB!!'));

db.once('open',function(){
    console.log('Connect to Database :: MongoDB');
})

module.exports = db;