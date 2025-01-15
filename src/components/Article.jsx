import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";


const Article = ({ title, content, date, link }) => {
  
  const [isExpanded, setIsExpanded] = useState(false); // Track expand/collapse state

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  console.log(date)
  return (
    <div className="article">
      <h2
        onClick={toggleExpand}
        style={{
          cursor: "pointer",
          color: isExpanded ? "hsl(221, 45%, 47%)" : "black",
          marginBottom: "5px",
        }}
      >
        {title}
      </h2>
      <p>
        <strong>Published on:</strong> {new Date(date).toLocaleDateString()}
      </p>
      {isExpanded && (
        <div className="article-content" style={{ marginTop: "10px" }}>
          <MathJax>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </MathJax>
        </div>
      )}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", marginTop: "10px", color: "blue" }}
      >
        Read Original
      </a>
    </div>
  );
};

export default Article;
