import express from 'express';
import { addStory } from '../controllers/stories';

const router=express.Router();

router.post('/', addStory);

export default router;