import Express from 'express';
import { addPost, deletePost, getPosts } from '../controllers/posts.js';

const router = Express.Router();

router.get('/',getPosts);
router.post('/',addPost);
router.delete('/:postId',deletePost);


export default router;