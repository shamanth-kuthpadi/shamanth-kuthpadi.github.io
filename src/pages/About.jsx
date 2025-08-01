// I want to create a component for each work experience
import profileImg from "../assets/profile.jpeg";
import Experience from "../components/Experience";

import React from "react";
import TypingEffect from "react-typing-effect";

import { motion, useScroll } from "motion/react";

const publications = [
  {
    title:
      "A Smart Electrode-Integrated Cooling Patch for Motion-Robust ECG Monitoring and Real-Time 3D Facial Animation",
    // link: "https://example.com/publication1",
    authors:
      "T. Q. Trung, S. K. Seethakantha, Z. Lei, A. Radmehr, P. Nguyen, D. Ganesan",
    venue: "To be submitted to a journal",
    description:
      "Developed a smart electrode-integrated system for robust biosignal acquisition and designed a deep learning pipeline to reconstruct real-time 3D facial animations in VR from physiological signals.",
  },
  {
    title:
      "Assess-and-Evolve: Scalable Generation of Preference Tuning Data for Alleviating Hallucinations in Medical Summaries",
    // link: "https://example.com/publication1",
    authors:
      "S. K. Seethakantha, D. Thai, S. Tiwari, V. P. Gudi, S. Mohan, S. Sairaj, W. Zhao, A. Mitra, A. McCallum",
    venue: "Almost finished, to be submitted in AAAI 2026",
    description:
      "We propose a detect-and-revise framework paired with Direct Preference Optimization (DPO) using automatically generated silver data to reduce hallucinations in medical summarization.",
  },
  {
    title: "Modeling & Analyzing Structural Brain Connectomes",
    // link: "https://example.com/publication2",
    authors: "S. Kuthpadi Seethakantha",
    venue: "Academic Project, UMass Amherst",
    description:
      "This study used pre-processed brain connectome data to apply machine learning and spectral graph theory, developing a classifier that maps node-level features to brain regions.",
  },
];

// --- News items array ---
const news = [
  {
    date: "August 2025",
    text: 'Finally "finished" creating my personal website.',
  },
  {
    date: "February 2025",
    text: "Working under the supervision of Prof. Deepak Ganesan and with Wireless and Sensor Systems Lab to create a multi-modal system for real-time 3D facial animation from physiological signals.",
  },
  {
    date: "January 2025", 
    text: "Working with Mendel.ai to mitigate hallucinations in clinical summarization using synthetic data generation and preference tuning."},
  {
    date: "January 2025",
    text: "Starting my Master's in Computer Science at the University of Massachusetts Amherst",
  },
  {
    date: "December 2024",
    text: "Graduated with a Bachelor's degree in Computer Science from the University of Massachusetts Amherst",
  },
  {
    date: "September 2024",
    text: "Began my Independent Study in modeling and analyzing structural brain connectomes under the supervision of Cameron Musco",
  },
  {
    date: "June 2024",
    text: "Started working as a Machine Learning Research Intern at IOMICS Corporation",
  },
  {
    date: "September 2021",
    text: "Started my undergraduate degree in Computer Science at the University of Massachusetts Amherst",
  },
];

function About() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="about">
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
      <div className="about-main">
        <div className="hero">
          <div className="header">
            <h1>
              <TypingEffect
                text={["about."]}
                speed={100}
                eraseSpeed={50}
                eraseDelay={2000}
                typingDelay={500}
              />
            </h1>
          </div>
          <p className="subtitle">find out more about me.</p>
        </div>
        <div className="container">
          <div className="profile-pic">
            <img src={profileImg} className="profimg" />
          </div>
          <div className="para">
            <p>
              I am a computer science graduate student at the{" "}
              <a href="https://www.cics.umass.edu/">
                Manning College of Information and Computer Sciences
              </a>{" "}
              in UMass Amherst.
            </p>
            <p>
              My research focuses on developing advanced AI systems to deepen
              our understanding of complex biological processes and drive
              impactful advancements in healthcare. By leveraging causal
              learning and inference on multimodal data — including the detailed
              modeling of biological networks like brain connectomes — I aim to
              reveal fundamental structures and relationships that can guide
              more accurate diagnostics and innovative therapeutic approaches.
            </p>
            <p>
              This summer I am a ML research intern at{" "}
              <a href="https://iomics.ai/">IOMICS Corporation</a>, where I focus
              on building automated casual discovery/estimation pipelines and
              researching Kolmogorov-Arnold Networks (KANs) for their
              applicability in the unsupervised and supervised domains.
            </p>
          </div>
        </div>
      </div>
      {/* --- News Section --- */}
      <div className="news-section">
        <h2 className="section-title">
          News
        </h2>
        <ul>
          {news.map((item, idx) => (
            <li>
              <span>
                {item.text}
              </span>
              <span>{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* --- End News Section --- */}
      <div className="research-section">
        <h2 className="section-title">Publications & Current Research</h2>
        {publications.map((pub, index) => (
          <div key={index} className="publication-item">
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-title"
            >
              {pub.title}
            </a>
            <div className="pub-meta">
              <span>{pub.authors}</span> · <span>{pub.venue}</span>
            </div>
            <p className="pub-description">{pub.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
