import React from "react";
import TypingEffect from "react-typing-effect";
import { motion, useScroll } from "motion/react";

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    const MY_KEY = import.meta.env.VITE_EMAIL_API_KEY;

    formData.append("access_key", MY_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="contact">
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
      <div className="contact-main">
        <div className="hero">
          <div className="header">
            <h1>
              <TypingEffect
                text={[
                  "contact me.",
                ]}
                speed={100}
                eraseSpeed={50}
                eraseDelay={2000}
                typingDelay={500}
              />
            </h1>
          </div>
          <p className="subtitle">
            if any of what I do interests you, get in touch.
          </p>
        </div>
        <form onSubmit={onSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit Form
          </button>
        </form>
        <span className="form-result">{result}</span>
      </div>
    </div>
  );
}

export default Contact;
