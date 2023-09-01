import Express from 'express';
import { addComment, getComments } from '../controllers/comments.js';

const router = Express.Router();
router.get('/:postId', getComments);
router.post('/', addComment);


export default router;