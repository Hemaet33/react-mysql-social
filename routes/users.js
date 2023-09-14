import Express from 'express';
import { getFriends, getPosts, getUser, getUsers, searchUser, updateUser } from '../controllers/users.js';

const router = Express.Router();

router.get('/post/:userId', getPosts);
router.get('/profile/:userId', getUser);
router.get('/profile/:userId/:qu', getUser);
router.get('/search/:name', searchUser);
router.get('/', getUsers);
router.get('/friends', getFriends);
router.patch('/', updateUser);


export default router;