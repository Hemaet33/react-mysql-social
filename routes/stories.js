import express from 'express';
import { addStory, getStory } from '../controllers/stories.js';

const router=express.Router();

router.post('/', addStory);
router.get('/', getStory);

export default router;