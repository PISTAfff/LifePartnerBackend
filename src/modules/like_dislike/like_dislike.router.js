import { Router } from 'express';
import { likePost, dislikePost } from './like_dislike.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/like/:id', authMiddleware, likePost);
router.post('/dislike/:id', authMiddleware, dislikePost);

export default router;
