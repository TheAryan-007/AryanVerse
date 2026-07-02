import SkillsClient from "./SkillsClient";

export const metadata = {
  title: "Skills | AryanVerse",
  description: "Explore the technical skill matrix, programming languages, libraries, databases, and frameworks utilized by Aryan Chauhan.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/skills",
  },
};

export default function Page() {
  return <SkillsClient />;
}
