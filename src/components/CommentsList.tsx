import React from "react";
import Comment from "../models/Comment";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      <h3>Comments</h3>
      {comments.map((comment: Comment, index: number) => (
        <div className="comment" key={index}>
          <h4>{comment.username}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentList;
