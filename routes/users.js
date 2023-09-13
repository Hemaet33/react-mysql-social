import Express from 'express';
import { getPosts, getUser, getUsers, updateUser } from '../controllers/users.js';

const router = Express.Router();

router.get('/post/:userId', getPosts);
router.get('/profile/:userId', getUser);
router.get('/profile/:userId/:qu', getUser);
router.get('/', getUsers);
router.patch('/', updateUser);


export default router;