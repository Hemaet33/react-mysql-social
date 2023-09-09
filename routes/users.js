import Express from 'express';
import { getUser, updateUser } from '../controllers/users.js';

const router = Express.Router();

router.get('/profile/:userId', getUser);
router.patch('/', updateUser);


export default router;