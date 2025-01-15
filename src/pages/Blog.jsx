import React, { useEffect, useState } from "react";
import Article from "../components/Article.jsx";
import TypingEffect from "react-typing-effect";
import DOMPurify from "dompurify";


const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [customArticles, setCustomArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSS = async () => {
      const feedUrl = "https://medium.com/feed/@shamanth.kuthpadi2003";

      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed");
        }
        const data = await response.json();

        const articles = data.items

        setArticles(articles);

      } catch (err) {
        console.error(err);
        setError("Failed to load Medium articles.");
      }
    };

    fetchRSS();
  }, []);

useEffect(() => {
  const fetchCustomArticles = async () => {
    try {
      const response = await fetch("/output.html");
      if (!response.ok) {
        throw new Error("Failed to load the custom article HTML file.");
      }

      const rawHtml = await response.text();
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);

      setCustomArticles([
        {
          title: "Structural Brain Connectomes",
          content: sanitizedHtml,
          pubDate: "2024-12-15",
          link: "https://drive.google.com/file/d/10iTYCI9BEZVOUOsA5EJmWnF35_UsFa_2/view?usp=sharing",
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to load custom articles.");
    }
  };

  fetchCustomArticles();
}, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  const allArticles = [...articles, ...customArticles].sort(
    (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
  );

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
      {!error && allArticles.length === 0 && <p>Loading articles...</p>}
      <div>
        {allArticles.map((article, index) => (
          <Article
            key={index}
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
