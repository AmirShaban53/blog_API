import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";
import logger from "../middleware/logger";

const createPost =async (req, res) => {
    try {
        const {title, discription, content, aurthor} = req.body;
        const data = {
            title: title, 
            discription: discription, 
            content: content, 
            aurthor: aurthor
        }
        await Post.create(data)
        logger.info('new post created')
        return res.status(201).json('new post created');
    } catch (error) {
        logger.error(`failed to create post`)
        return res.status(500).json({error: error.message})
    }
}
const viewPosts =async (req, res) => {
    try {
        const posts = await Post.findAll({});
        logger.info('get all posts')
        return res.status(200).json(posts);
    } catch (error) {
        logger.error('failed to get posts')
        return res.status(500).json({error: error.message})
    }
}
const viewPost =async (req, res) => {
    try {
        const post =await Post.findOne({where: {id: req.params.id}})
        logger.info(`post of given index obtained`)
        return res.status(200).json(post);
    } catch (error) {
        logger.error(`failed to get post of given index`)
        return res.status(500).json({error: error.message})
    }
}
const deletePost =async (req, res) => {
    try {
        await Post.destroy({where: {id : req.params.id}})
        logger.info(`post has been deleted`)
        return res.status(200).json('post deleted');
    } catch (error) {
        logger.error(`failed to delete post`)
        return res.status(500).json({error: error.message})
    }
}

const addComment =async (req, res) => {
    try {
        const user =await  User.findOne({where: {id: req.userData.id}});
        const newComment = {
            comment: req.body.comment,
            postId: req.params.id, 
            userId: user.id
        }
        await user.createComment(newComment)
        logger.info('new comment created')
        return res.status(201).json( 'new comment created');
    } catch (error) {
        logger.error('failed to create comment')
        return res.status(500).json({error: error.message})
    }
}
const viewComments =async (req, res) => {
    try {
        const comments= await Comment.findAll({where: {postId: req.params.id}})
        logger.info('all comments to post found!')
        return res.status(200).json(comments);
    } catch (error) {
        logger.error('failed to get comments')
        return res.status(500).json({error: error.message})
    }
}


export {
    createPost,
    viewPosts,
    viewPost,
    deletePost,
    addComment,
    viewComments
}