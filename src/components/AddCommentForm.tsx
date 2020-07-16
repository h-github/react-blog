import React, { useState } from "react";
import Article from "../models/Article";
import Comment from "../models/Comment";

const AddCommentForm = ({
  articleName,
  setArticleInfo,
}: {
  articleName: string;
  setArticleInfo: (body: React.SetStateAction<Article>) => void;
}) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: "post",
      body: JSON.stringify(new Comment({ username, text: commentText })),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await result.json();
    setArticleInfo(body);
    setUsername("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          cols={15}
          rows={4}
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        ></textarea>
      </label>

      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
