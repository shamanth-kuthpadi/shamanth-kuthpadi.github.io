// Blog.jsx
import React, { useEffect, useState } from "react";
import TypingEffect from "react-typing-effect";
import DOMPurify from "dompurify";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [customArticles, setCustomArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchRSS = async () => {
      const feedUrl = "https://medium.com/feed/@shamanth.kuthpadi2003";
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`
        );
        if (!response.ok) throw new Error("Failed to fetch RSS feed");
        const data = await response.json();
        setArticles(data.items);
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
        if (!response.ok)
          throw new Error("Failed to load the custom article HTML file.");
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

  const allArticles = [...articles, ...customArticles].sort(
    (a, b) =>
      new Date(b.pubDate || "1970-01-01") - new Date(a.pubDate || "1970-01-01")
  );

  const filteredArticles = allArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          height: "4px",
          originX: 0,
          backgroundColor: "#6ec1e4",
          zIndex: 1000,
          borderRadius: "2px",
          boxShadow: "0 0 4px #6ec1e4",
        }}
      />

      <div className="hero">
        <div className="header">
          <h1>
            <TypingEffect
              text={["my blog.", "academic notes.", "personal thoughts."]}
              speed={100}
              eraseSpeed={50}
              eraseDelay={1500}
              typingDelay={500}
            />
          </h1>
        </div>
        <p className="subtitle">
          {`just a compilation of my academic and personal writing — ${allArticles.length} articles.`}
        </p>

        <input
          type="text"
          className="blog-search-input"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error && <p className="loader error">{error}</p>}
      {!error && filteredArticles.length === 0 && (
        <p className="loader">No articles found.</p>
      )}

      <div className="article-grid">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={index}
            className="article-card"
            onClick={() => setSelectedArticle(article)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <h3 className="article-title">{article.title}</h3>
            <p className="article-date">{formatDate(article.pubDate)}</p>
            <div className="article-excerpt">
              {article.content.slice(0, 160).replace(/<[^>]+>/g, "") + "..."}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="modal-backdrop"
            onClick={() => setSelectedArticle(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>{selectedArticle.title}</h2>
              <p className="article-date">
                {formatDate(selectedArticle.pubDate)}
              </p>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              <a
                href={selectedArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-original-link"
              >
                Read Original ↗
              </a>
              <button
                className="submit-button"
                onClick={() => setSelectedArticle(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
