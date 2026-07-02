import ProjectDetailsClient from "./ProjectDetailsClient";

const projectMetadata = {
  "skysentry-ai": {
    title: "SkySentry AI",
    desc: "AI-Powered Computer Vision for False Alert Reduction in Aerial Surveillance by Aryan Chauhan."
  },
  "echoes-within": {
    title: "Echoes Within",
    desc: "Invisible Communication Through Audio Steganography. A premium cybersecurity web project by Aryan Chauhan."
  },
  "intern-ease": {
    title: "Intern-Ease",
    desc: "AI-Based Internship Recommendation Engine for PM Internship Scheme. Match profiles dynamically."
  },
  "bubble-blast": {
    title: "Bubble-Blast",
    desc: "Game development and visual interactions case study by Aryan Chauhan."
  },
  "aryanverse": {
    title: "AryanVerse Portal",
    desc: "Detailed case study of the interactive 3D WebGL space universe portfolio."
  },
  "lyfchanger": {
    title: "LyfChanger",
    desc: "A custom branding and web platform project details."
  },
  "cafe-marketing": {
    title: "Cafe Marketing",
    desc: "Marketing automations and digital assets dashboard project details."
  },
  "unscripted-love": {
    title: "Unscripted Love",
    desc: "The detailed design and book launch portal case study."
  },
  "project-nexus": {
    title: "Project Nexus",
    desc: "Custom systems integration and data dashboard details."
  },
  "quantized-cosmos": {
    title: "Quantized Cosmos",
    desc: "Space calculations, WebGL physics, and visual simulation case study."
  },
  "cinesuggest-ai": {
    title: "CineSuggest AI",
    desc: "AI recommendation engine for cinema and films based on user choices."
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectMetadata[slug] || {
    title: "Project Case Study",
    desc: "Detailed case study of software projects by Aryan Chauhan."
  };

  return {
    title: `${project.title} | AryanVerse`,
    description: project.desc,
    alternates: {
      canonical: `https://aryan-verse-kappa.vercel.app/projects/${slug}`,
    },
  };
}

export default function Page({ params }) {
  return <ProjectDetailsClient params={params} />;
}
