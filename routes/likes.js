import Express from 'express';
import { dislike, getLikes, like } from '../controllers/likes.js';

const router = Express.Router();

router.post('/', like);
router.delete('/:postId', dislike);
router.get('/', getLikes);


export default router;