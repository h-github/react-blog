import React from "react";
import Article from "../models/Article";

const UpvotesSection = ({
  articleInfo,
  setArticleInfo,
}: {
  articleInfo: Article;
  setArticleInfo: (body: React.SetStateAction<Article>) => void;
}) => {
  const upvoteArticle = async () => {
    const result = await fetch(`/api/articles/${articleInfo.name}/upvote`, {
      method: "post",
    });
    const body = await result.json();
    setArticleInfo(body);
  };

  return (
    <div id="upvotes-section">
      <button onClick={upvoteArticle}>Add Upvote</button>
      <p>This post has been upvoted {articleInfo.upvotes} times</p>
    </div>
  );
};

export default UpvotesSection;
