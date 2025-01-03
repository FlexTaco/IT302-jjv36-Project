import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let comments;
export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn.db(process.env.JOBS_NS).collection("comments");
    } catch (err) {
      console.error(`unable to connect in CommentsDAO: ${err}`);
    }
  }

  static async addComment(jobId, user, comment, date) {
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        comment: comment,
        job_id: ObjectId.createFromHexString(jobId),
      };
      return await comments.insertOne(commentDoc);
    } catch (e) {
      console.error(`unable to post comments: ${e}`);
      console.error(e);
      return { error: e };
    }
  }

  static async updateComment(commentId, userId, comment, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: ObjectId.createFromHexString(commentId) },
        { $set: { comment: comment, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update comments: ${e}`);
      console.error(e);
      return { error: e };
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId.createFromHexString(commentId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete comments: ${e}`);
      console.error(e);
      return { error: e.message };
    }
  }
}
