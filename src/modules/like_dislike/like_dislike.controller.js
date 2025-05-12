import { LikeDislike } from '../../../../DB/models/community/like_dislike.model.js';
import { Post } from '../../../../DB/models/community/post.model.js';
import mongoose from 'mongoose';

export const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const existing = await LikeDislike.findOne({ userId, postId });
    if (existing && existing.type === 'like') {
      await LikeDislike.deleteOne({ _id: existing._id });
    } else if (existing && existing.type === 'dislike') {
      existing.type = 'like';
      await existing.save();
    } else {
      await LikeDislike.create({ userId, postId, type: 'like' });
    }
    const [likes, dislikes] = await Promise.all([
      LikeDislike.countDocuments({ postId, type: 'like' }),
      LikeDislike.countDocuments({ postId, type: 'dislike' })
    ]);
    res.json({ likes, dislikes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const existing = await LikeDislike.findOne({ userId, postId });
    if (existing && existing.type === 'dislike') {
      await LikeDislike.deleteOne({ _id: existing._id });
    } else if (existing && existing.type === 'like') {
      existing.type = 'dislike';
      await existing.save();
    } else {
      await LikeDislike.create({ userId, postId, type: 'dislike' });
    }
    const [likes, dislikes] = await Promise.all([
      LikeDislike.countDocuments({ postId, type: 'like' }),
      LikeDislike.countDocuments({ postId, type: 'dislike' })
    ]);
    res.json({ likes, dislikes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
