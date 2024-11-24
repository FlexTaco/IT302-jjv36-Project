import CommentDAO from "../dao/commentDAO.js";

export default class CommentsController {
  static async apiPostComments(req, res, next) {
    try {
      const jobId = req.body.job_id;
      const comment = req.body.comment;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const CommentResponse = await CommentDAO.addComment(
        jobId,
        userInfo,
        comment,
        date
      );
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateComments(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const comment = req.body.comment;
      const date = new Date();
      const CommentResponse = await CommentDAO.updateComment(
        commentId,
        req.body.user_id,
        comment,
        date
      );

      var { error } = CommentResponse;
      if (error) {
        res.status.json({ error });
      }
      if (CommentResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update comment. User may not be original poster"
        );
      }
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteComments(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const userId = req.body.user_id;
      const CommentResponse = await CommentDAO.deleteComment(commentId, userId);
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
