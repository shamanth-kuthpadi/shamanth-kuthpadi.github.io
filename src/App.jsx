import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blog.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

function App() {
  return (
    <MathJaxContext version={3} config={config}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cv"
            element={
              <Navigate
                to="https://drive.google.com/file/d/1xLb4kvgFkh25lIZgvurpjbBDnMKbsQoJ/view?usp=sharing"
                replace
              />
            }
          />
          <Route
            path="/blog"
            element={
              <MathJax hideUntilTypeset={"first"}>
                <Blog />
              </MathJax>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </MathJaxContext>
  );
}

export default App;
