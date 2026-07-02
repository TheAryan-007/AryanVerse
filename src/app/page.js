import HomeClient from "./HomeClient";

export const metadata = {
  title: "AryanVerse | Aryan Chauhan",
  description: "Step into the cinematic 3D universe of Aryan Chauhan, a B.Tech Data Science student at Bennett University. Showcasing projects, skills, blogs, books, cinema, and AI creations.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app",
  },
};

export default function Page() {
  return <HomeClient />;
}
