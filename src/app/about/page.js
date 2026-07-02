import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | AryanVerse",
  description: "Learn about Aryan Chauhan's background, education at Bennett University, interest in Data Science, and creative journey.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
