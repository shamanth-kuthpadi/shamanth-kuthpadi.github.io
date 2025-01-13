import React, { useEffect, useState } from "react";
import Article from "../components/Article.jsx";
import TypingEffect from "react-typing-effect";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSS = async () => {
      const feedUrl = "https://medium.com/feed/@shamanth.kuthpadi2003"; // Replace with your Medium username

      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed");
        }
        const data = await response.json();

        // Sort articles by date (most recent first)
        const sortedArticles = data.items.sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
        );

        setArticles(sortedArticles);
      } catch (err) {
        console.error(err);
        setError("Failed to load Medium articles.");
      }
    };

    fetchRSS();
  }, []);

  return (
    <div className="blog">
      <div className="header">
                <h1>
                  <TypingEffect
                    text={["explore my blog."]}
                    speed={100}
                    eraseSpeed={50}
                    eraseDelay={2000}
                    typingDelay={500}
                  />
                </h1>
        </div>
      {error && <p>{error}</p>}
      {!error && articles.length === 0 && <p>Loading articles...</p>}
      <div>
        {articles.map((article) => (
          <Article
            key={article.guid}
            title={article.title}
            content={article.content}
            date={article.pubDate}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
