const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

module.exports.signup = async function(req,res){
    const {name, email, password} = req.body
    if(!email || !name || !password){
        return res.status(422).json({error : "Plz add all the fields"});
    }
    try{
        const user = await User.findOne({email:email});

        if(!user){
            const hashedPassword = await bcrypt.hash(password,12);
            await User.create({
                email,
                password : hashedPassword,
                name
            });
            res.json({message : "Created Successfully!!"})
        }
        else{
            return res.status(422).json({errror : "User already exist!!"});
        }
    }catch(err){
        console.log("Error!!",err);
    }
    
}

module.exports.signin = async function(req,res){
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error : "Plz add all the fields"});
    }
    try{
        const user = await User.findOne({email:email});

        if(user){
            const match = await bcrypt.compare(password,user.password);
            if(match){
                const token = jwt.sign({_id : user._id},JWT_SECRET);
                const {_id,name,email} = user
                res.json({token, user : {_id,name,email}})
            }
            else{
                return res.status(422).json({error : "Invalid Email or Password"});
            }
        }
        else{
            return res.status(422).json({error : "Invalid Email or Password"});
        }
    }catch(err){
        console.log("Error!!",err);
    }
    
}