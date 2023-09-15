import Express from 'express';
import { addComment, deleteComment, getComments } from '../controllers/comments.js';

const router = Express.Router();
router.get('/:postId', getComments);
router.post('/', addComment);
router.delete('/:commentId', deleteComment);


export default router;