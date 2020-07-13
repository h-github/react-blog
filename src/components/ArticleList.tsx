import React from "react";
import { Link } from "react-router-dom";

interface Props {
  articles: {
    name: string;
    title: string;
    content: string[];
  }[];
}

const ArticleList = (props: Props) => {
  return (
    <>
      {props.articles.map((ac, index: number) => (
        <Link
          className="article-list-item"
          key={index}
          to={`/article/${ac.name}`}
        >
          <h3>{ac.title}</h3>
          <p>{ac.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

export default ArticleList;
