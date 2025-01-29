import React, { useEffect, useState } from "react";
import Article from "../components/Article.jsx";
import TypingEffect from "react-typing-effect";
import DOMPurify from "dompurify";
import { motion, useScroll } from "motion/react";


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

  const { scrollYProgress } = useScroll();
  
  return (
    <div className="blog">
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />

      <div className="hero">
        <div className="header">
          <h1>
            <TypingEffect
              text={["my blog."]}
              speed={100}
              eraseSpeed={50}
              eraseDelay={2000}
              typingDelay={500}
            />
          </h1>
        </div>
        <p className="subtitle">
          just a compilation of my academic and personal writing, click the title to read.
        </p>
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
