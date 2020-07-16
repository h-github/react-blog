import React, { useState, useEffect } from "react";
import { match } from "react-router-dom";
import articleContent from "./article-content";
import ArticleList from "../components/ArticleList";
import NotFoundPage from "./NotFoundPage";
import Article from "../models/Article";
import CommentList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";

interface Params {
  name: string;
}

interface Props {
  match: match<Params>;
}

const ArticlePage = (props: Props) => {
  const { name } = props.match.params;
  const article = articleContent.find(arcl => arcl.name === name);

  const [articleInfo, setArticleInfo] = useState(
    new Article({ name: "", upvotes: 0, comments: [] })
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(arcl => arcl.name !== name);
  return (
    <>
      <div>
        <h1>{article.title}</h1>
        <UpvotesSection
          articleInfo={articleInfo}
          setArticleInfo={setArticleInfo}
        />
        {article.content.map((con: string, index: number) => (
          <p key={index}>{con}</p>
        ))}
      </div>
      {articleInfo.comments && articleInfo.comments.length > 0 ? (
        <CommentList comments={articleInfo.comments} />
      ) : null}

      <AddCommentForm
        articleName={articleInfo.name}
        setArticleInfo={setArticleInfo}
      />
      <h3>Other Articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
