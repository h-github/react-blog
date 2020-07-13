import React from "react";
import { match } from "react-router-dom";
import articleContent from "./article-content";
import ArticleList from "../components/ArticleList";
import NotFoundPage from "./NotFoundPage";

interface Params {
  name: string;
}

interface Props {
  match: match<Params>;
}

const ArticlePage = (props: Props) => {
  const { name } = props.match.params;
  const article = articleContent.find(arcl => arcl.name === name);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(arcl => arcl.name !== name);
  return (
    <>
      <div>
        <h1>{article.title}</h1>
        {article.content.map((con: string, index: number) => (
          <p key={index}>{con}</p>
        ))}
      </div>

      <h3>Other Articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
