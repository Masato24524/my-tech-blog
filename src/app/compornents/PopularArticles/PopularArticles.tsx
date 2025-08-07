import React from "react";
import { PopularArticle } from "../../utils/popularArticles";
import "./PopularArticles.css";
import Link from "next/link";

interface PopularArticlesProps {
  articles: PopularArticle[];
}

const PopularArticles = ({ articles }: PopularArticlesProps) => {
  const idPhoto: number = Math.floor(Math.random() * 1000);
  const timestamp: number = new Date().getTime();

  return (
    <section className="popular-articles">
      <h2 className="popular-articles__title">
        <span className="popular-articles__icon">🔥</span>人気記事
      </h2>
      <div className="popular-articles__list">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={article.path}
            className="popular-article-card"
          >
            <div className="popular-article-card__content">
              <div className="popular-article-card__img">
                <div className="popular-article-card__rank">{index + 1}</div>
                <img
                  className="max-w-sm w-2/3 min-w-[150px] h-1/4 mr-4"
                  src={`https://picsum.photos/seed/${
                    idPhoto + index
                  }/1200/800.jpg?${timestamp}`}
                  alt="No image"
                />
              </div>
              <h3 className="popular-article-card__title">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularArticles;
