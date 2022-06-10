const exp = require('constants');
const express = require('express');
const requireLogin = require('../middleware/requireLogin');

const router = express.Router();

const postController = require('../controllers/postController');

router.post('/createpost',requireLogin,postController.createPost);

router.get('/allpost',requireLogin,postController.allPost);

router.get('/myposts',requireLogin,postController.myposts)

router.put('/like',requireLogin,postController.likePost)

router.put('/unlike',requireLogin,postController.unlikePost)

router.put('/comment',requireLogin,postController.comment)


module.exports = router;