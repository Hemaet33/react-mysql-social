import express from 'express';
import { addStory } from '../controllers/stories.js';

const router=express.Router();

router.post('/', addStory);

export default router;