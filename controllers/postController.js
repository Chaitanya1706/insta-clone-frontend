const Post = require('../models/post')

module.exports.createPost = async (req,res) => {
    const {title,body,photo} = req.body;
    console.log(req.body);
    if(!title || !body || !photo){
        return res.status(422).json({err : "Plz add all the fields!!"})
    }
    try{
        const post = await Post.create(req.body);
        req.user.password = undefined
        post.postedBy = req.user;
        await post.save();
        res.json({post : post});
    }catch(err){
        console.log("Error",err);
    }
}

module.exports.allPost = async (req,res) => {
    try {
        const posts = await Post.find().populate("postedBy","_id name")
        res.json({posts});
    }catch(err){
        console.log("Error",err)
    }
}

module.exports.myposts = (req,res) => {
    Post.find({postedBy : req.user._id})
    .populate('postedBy',"_id name")
    .then(myposts => {
        res.json({myposts})
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.likePost = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push : {likes : req.user._id}
    },{
        new : true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
}

module.exports.unlikePost = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull : {likes : req.user._id}
    },{
        new : true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
}


module.exports.comment = (req,res) => {
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push : {comments : req.user._id}
    },{
        new : true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
}