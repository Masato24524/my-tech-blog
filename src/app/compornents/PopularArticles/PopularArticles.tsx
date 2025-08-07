import React from "react";
import { PopularArticle } from "../../utils/popularArticles";
import "./PopularArticles.css";
import Link from "next/link";

interface PopularArticlesProps {
  articles: PopularArticle[];
}

const PopularArticles = ({ articles }: PopularArticlesProps) => {
  return (
    <section>
      <h2 className="popular-articles__title">人気記事TOP3</h2>
      <div>
        {articles.map((article, index) => (
          <Link key={index} href={article.path}>
            <h3>{article.title}</h3>
            <h3>{article.path}</h3>
            <h3>{article.pageViews}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularArticles;
