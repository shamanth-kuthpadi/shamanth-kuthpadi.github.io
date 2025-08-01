import React from "react";

const Article = ({ title, content, date, link }) => {
  return (
    <div className="article-card">
      <div className="article-header">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="article-title"
        >
          {title}
        </a>
        <div className="article-date">{new Date(date).toDateString()}</div>
      </div>
      <div className="article-body">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Article;
