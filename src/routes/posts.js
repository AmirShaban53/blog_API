import {Router} from 'express';
import * as posts from '../controllers/posts.js';
import checkAuth from '../middleware/checkAuth.js';
import imageUpload from '../middleware/imageUploader.js';

const router = Router();


router.post('/', checkAuth, imageUpload, posts.createPost)
router.get('/', posts.viewPosts)
router.get('/:id', posts.viewPost)
router.delete('/:id', checkAuth, posts.deletePost)

router.post('/:id/comment', posts.addComment)
router.get('/:id/comment', posts.viewComments)

export default router;