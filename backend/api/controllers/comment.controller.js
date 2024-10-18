import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, "you are not authorized to commentssss"));
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(errorHandler(500, "Something went wrong"));
  }
};
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    // Check if the comment exists
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.Likes.indexOf(req.user.id);

    // Check if user has already liked the comment
    if (userIndex === -1) {
      // User has not liked the comment, so add the like
      comment.numberOfLikes += 1;
      comment.Likes.push(req.user.id);
    } else {
      // User has already liked the comment, so remove the like
      comment.numberOfLikes -= 1;
      comment.Likes = comment.Likes.filter((id) => id !== req.user.id);
    }

    // Save the updated comment in the database
    await comment.save();

    // Send the updated likes and number of likes back to the client
    res.status(200).json({
      likes: comment.Likes,
      numberOfLikes: comment.numberOfLikes,
    });
  } catch (error) {
    // Handle any errors
    next(errorHandler(500, "Something went wrong"));
  }
};

export const editComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }
  if (comment.userId !== req.user.id) {
    return next(
      errorHandler(403, "You are not authorized to edit this comment")
    );
  }
  const editedComment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    { content: req.body.content },
    { new: true }
  );
  res.status(200).json(editedComment);

  try {
  } catch (error) {}
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not authorized to delete this comment")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, "Something went wrong"));
  }
};
