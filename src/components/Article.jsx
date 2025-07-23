import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";

// Helper to get a plain text excerpt from HTML
function getExcerpt(html, maxLength = 180) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const Article = ({ title, content, date, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((v) => !v);

  return (
    <div className="article-card">
      <div className="article-header">
        <h2
          className="article-title"
          onClick={toggleExpand}
          tabIndex={0}
          style={{ cursor: "pointer" }}
        >
          {title}
        </h2>
        <span className="article-date">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
      <div className="article-body">
        {!isExpanded ? (
          <p className="article-excerpt">{getExcerpt(content)}</p>
        ) : (
          <div className="article-content">
            <MathJax>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </MathJax>
          </div>
        )}
      </div>
      <div className="article-actions">
        <button className="read-more-btn" onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Read more"}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="read-original-link"
        >
          Read Original ↗
        </a>
      </div>
    </div>
  );
};

export default Article;
