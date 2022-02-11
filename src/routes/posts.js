import {Router} from 'express';
import * as posts from '../controllers/posts.js';
import checkAuth from '../middleware/checkAuth.js';

const router = Router();


router.post('/', posts.createPost)
router.get('/', posts.viewPosts)
router.get('/:id', posts.viewPost)
router.delete('/:id', posts.deletePost)

router.post('/:id/comment', checkAuth, posts.addComment)
router.get('/:id/comment', posts.viewComments)

export default router;