import express from 'express';
import { addStory, deleteStory, getStory } from '../controllers/stories.js';

const router=express.Router();

router.post('/', addStory);
router.get('/', getStory);
router.delete('/:userId', deleteStory);

export default router;