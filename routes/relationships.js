import express from 'express';
import { addRelationships, getRelationships, removeRelationships } from '../controllers/relationships.js';

const router = express.Router();

router.get('/:followedUserId',getRelationships);
router.delete('/:followedUserId',removeRelationships);
router.post('/',addRelationships);

export default router;