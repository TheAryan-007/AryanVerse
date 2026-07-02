import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects | AryanVerse",
  description: "Browse the engineering projects, machine learning models, and visual applications created by Aryan Chauhan.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/projects",
  },
};

export default function Page() {
  return <ProjectsClient />;
}
