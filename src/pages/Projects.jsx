import React from "react";
import TypingEffect from "react-typing-effect";
import ProjectCard from "../components/ProjectCard.jsx";
import { motion, useScroll } from "motion/react";



function Projects() {
  const projects = [
    {
      name: "Modeling & Analyzing Structural Brain Connectomes",
      tools: ["Python", "NumPy", "SciPy", "Matplot", "NetworkX"],
      description:
        "This independent study aimed to " +
        "explore the intersection of machine learning (ML) models, structural brain connectomes, and spectral graph theory. A significant challenge in this study was obtaining access to raw brain data. Many institutions with rights to the desired datasets either denied our requests or required specialized permissions from the" +
        "National Institute of Mental Health Data Archive (NDA). To overcome this limitation, we utilized pre-processed connectomic data kindly provided by Kerepesi et al. Using this data, we visualized and analyzed brain connectomes, ultimately developing a classifier capable of mapping node-level features to specific brain regions." +
        "A binary classifier achieved 94% accuracy for hemisphere classification, while a multi-class model reached 50% accuracy for cortical structure identification. We also demonstrated that the Fiedler vector alone can classify hemispheres with an accuracy exceeding 99%. This study highlights the utility of spectral graph theory in understanding brain structure and offers avenues for future research using generative models and additional datasets.",

      sourceCode:
        "https://github.com/shamanth-kuthpadi/IS-modeling-connectomes",
    },
    {
      name: "Accent Classifier",
      tools: ["Python", "librosa", "Convolutional Neural Net"],
      description:
        "We aim to develop an audio-based accent classifier capable of distinguishing between accents. " +
        "Our primary objective is to achieve high accuracy in classifying the accents of our team members: Shamanth, a U.S. resident, and Taru, an international student from India. " +
        "If time permits, we plan to extend the model's functionality to detect slurred speech as a distinct class. This project draws inspiration from the work of Bird et al., who performed accent classification for native and non-native speakers using seven phonetic sounds collected from subjects across diverse regions. " +
        "The overarching motivation for our model is to bridge communication gaps and overcome barriers created by accent differences. For instance, the model could serve as middleware in conversations between native and non-native speakers, enhancing mutual understanding. If extended to include slurred speech classification, " +
        "the model could function as a pre-diagnostic tool to identify slurred speech patterns, often a symptom of conditions like stroke, excessive alcohol consumption, or other medical issues. This capability could help expedite medical intervention or complement other diagnostic tools to provide timely support to affected individuals.",
      sourceCode: "https://github.com/shamanth-kuthpadi/accent-classifier",
    },
    {
      name: "Gene Expression Causal Estimator",
      tools: [
        "Python",
        "DoWhy",
        "NetworkX",
        "CausalDiscoveryToolbox",
        "causal-learn",
      ],
      description:
        "Expressing causal pathways between genes using their activation/expression metrics is still an open problem. " +
        "In this project, the aim was to build an automated pipeline that can take raw gene expression data as input and produce a causal graphical model that can be further used to find causal estimates between treatment and outcomes.",

      sourceCode: "https://github.com/shamanth-kuthpadi/dowhy-preeclampsia",
    },
    {
      name: "Chemistry Web App",
      tools: ["Express.js", "TypeScript", "MongoDB", "Figma"],
      description:
        "The purpose of this independent study project is to restructure how students learn organic chemistry by providing them with an interactive and engaging learning experience using web technology.",
      sourceCode: "https://github.com/cics-web-dev/Chem-Web-App",
    },
    {
      name: "Rust Mini Shell",
      tools: ["Rust"],
      description:
        "This final project for COMPSCI 377 can be categorized as a mini-shell service for editing files. The functionalities of the program allow users to read files, write to files, find instances of words, create files, and remove files.",
      sourceCode: "https://github.com/shamanth-kuthpadi/Rust-mini-Shell",
    },
    {
      name: "ESP32 WiFi Enabled Doorbell & Camera",
      tools: ["Arduino", "CAD", "Circuit Design"],
      description:
        "This final project for CICS 256 consists on a smart Wi-Fi doorbell. By using a camera we intend to transmit video to the user whenever the device is triggered. We were motivated to work on the speciffic project because security is in our everyday lives and it is a relevant research field. The idea is to implement a system that is triggered when it detects a change in a web service. This project is compelling as it combines many aspects of the maker world such as 3d printing, circuit design and programming. Our goal is to have a device that can be powered by a regular outlet and be as efficient as any other device of this sort.",
      sourceCode:
        "https://sites.google.com/view/wifidoorbell/home/project-report",
    },
  ];

  const { scrollYProgress } = useScroll();

  return (
    <div className="projects-container">
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
        <h1 className="title">
          <TypingEffect
            text={["stuff I coded, designed, and maybe broke (then fixed)."]}
            speed={100}
            eraseSpeed={50}
            eraseDelay={2000}
          />
        </h1>
        <p className="subtitle">
          explore the projects I've worked on, from ai to web development.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            tools={project.tools}
            description={project.description}
            sourceCode={project.sourceCode}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
