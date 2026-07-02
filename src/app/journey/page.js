import JourneyClient from "./JourneyClient";

export const metadata = {
  title: "Journey | AryanVerse",
  description: "Walk through the personal and educational milestones of Aryan Chauhan—from early school years to data science studies at Bennett University.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/journey",
  },
};

export default function Page() {
  return <JourneyClient />;
}
