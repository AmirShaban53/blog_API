import Post from "../models/post";
import Comment from "../models/comment";
import logger from "../middleware/logger";
import convertor from "../middleware/imageConvertor";
import { uploader } from "../config/cloudinaryConfig";

const createPost =async (req, res) => {
    try {
        const file =await convertor(req);
        const image = await uploader.upload(file);
        const {title, description, content, author} = req.body;
        const data = {
            title: title, 
            author: author,
            content: content,
            description: description, 
            image_URL: image.secure_url,
            image_ID: image.public_id,
        }
        await Post.create(data)
        logger.info('new post created')
        return res.status(201).json('new post created');
        
    } 
    catch (error) {
        logger.error(`failed to create post ${error}`)
        return res.status(500).json({error: error})
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
        const post = await Post.findOne({where: {id: req.params.id}})
        if(post.image_ID){await uploader.destroy(post.image_ID);}
        await Post.destroy({where: {id : req.params.id}})
        logger.info(`post has been deleted`)
        return res.status(200).json('post deleted');
    } catch (error) {
        logger.error(`failed to delete post`)
        return res.status(500).json({error: error.message})
    }
}

const addComment = async(req, res) => {
    try {
        const newComment = {
            name: req.body.name,
            postId: req.params.id,
            comment: req.body.comment,
        }
        await Comment.create(newComment);
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