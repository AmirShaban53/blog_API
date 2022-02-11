import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

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
        res.status(201).json('new post created');
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const viewPosts =async (req, res) => {
    try {
        const posts = await Post.findAll({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const viewPost =async (req, res) => {
    try {
        const post =await Post.findOne({where: {id: req.params.id}})
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const deletePost =async (req, res) => {
    try {
        await Post.destroy({where: {id : req.params.id}})
        res.status(200).json('post deleted');
    } catch (error) {
        res.status(500).json({error: error.message})
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
        res.status(201).json( 'new comment created');
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
const viewComments =async (req, res) => {
    try {
        const comments= await Comment.findAll({where: {postId: req.params.id}})
        res.status(201).json(comments);
    } catch (error) {
        res.status(500).json({error: error.message})
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