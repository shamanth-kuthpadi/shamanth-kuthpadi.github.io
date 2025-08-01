// I want to create a component for each work experience
import profileImg from "../assets/profile.jpeg";
import Experience from "../components/Experience";

import React from "react";
import TypingEffect from "react-typing-effect";

import { motion, useScroll } from "motion/react";

const updates = [
  {
    id: 1,
    date: "January 2025",
    desc: "Working on improving CryoSPIN with the help of Roshan Pathak",
  },
  {
    id: 2,
    date: "January 2025",
    desc: "Starting my Master's in Computer Science at the University of Massachusetts Amherst",
  },
  {
    id: 3,
    date: "December 2024",
    desc: "Graduated with a Bachelor's degree in Computer Science from the University of Massachusetts Amherst",
  },
  {
    id: 4,
    date: "September 2024",
    desc: "Began my Independent Study in modeling and analyzing structural brain connectomes under the supervision of Cameron Musco",
  },
  {
    id: 5,
    date: "June 2024",
    desc: "Started working as a Machine Learning Research Intern at IOMICS Corporation",
  },
  {
    id: 6,
    date: "September 2021",
    desc: "Started my undergraduate degree in Computer Science at the University of Massachusetts Amherst",
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
              learning and inference on multimodal data—including the detailed
              modeling of biological networks like brain connectomes—I aim to
              reveal fundamental structures and relationships that can guide
              more accurate diagnostics and innovative therapeutic approaches.
            </p>
            <p>
              I am currently an ML research intern at{" "}
              <a href="https://iomics.ai/">IOMICS Corporation</a>, where I focus
              on building automated casual discovery/estimation pipelines and researching Kolmogorov-Arnold Networks (KANs) for their applicability in the unsupervised and supervised domains. 
            </p>
          </div>
        </div>
      </div>
      <div className="experiences">
        <h2>My Experience</h2>
        <Experience
          name="IOMICS Corporation"
          date="June 2024"
          title="Machine Learning Research Intern"
          desc={[
            "Provided data-driven recommendations to the CTO and chief engineer, contributing to strategic decisions in product development and deployment",
            "Reviewed 50+ research papers on advanced machine learning and causal inference/discovery methodologies",
            "Utilized cutting-edge tools such as DoWhy and causal-learn to explore and answer causal questions in omics data",
            "Developed and delivered tutorials and theoretical presentations on causal analysis, effectively communicating complex concepts to the company’s engineers",
          ]}
          link="https://iomics.ai/"
        />
        <Experience
          name="University of Massachusetts Amherst"
          date="Sept. 2023 - June 2024"
          title="Undergraduate Course Assistant (UCA)"
          desc={[
            "Collaborated directly with professors and course instructors to foster learning 300+ students",
            "Engaged directly with students to provide course assistance in a broad category of concepts",
          ]}
          link="https://www.umass.edu"
        />
        <Experience
          name=""
          date="Sept. 2023 - Dec. 2023"
          title="Learning Resource Center (LRC) Peer Tutor"
          desc={[
            "Mentored 30+ students in a broad category of courses within the computer science department, earning an extension contract as a result of my effectiveness",
            "Selected as a distinguished hire from a pool of hundreds of candidates through two rounds of interview where I was tested on communication skills and academic aptitude",
          ]}
          link="https://www.umass.edu"
        />
        <Experience
          name=""
          date="June 2023 - Sept. 2023"
          title="Undergraduate Research Volunteer (URV)"
          desc={[
            "Developed research skills in the field of data science and machine learning",
            "Shadowed PhD research work in Approximate Nearest Neighbor(ANN) search algorithm, gaining exposure to lab work",
            "Calculated performance metrics of various ANNs systems and visualized them graphically",
          ]}
          link="https://www.umass.edu"
        />
      </div>
      <div className="updates">
        <h2>Updates</h2>
        <div className="timeline-container">
          {updates.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-marker">{index + 1}</div>
              <div className="timeline-content">
                <b className="timeline-date">{item.date}</b>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
