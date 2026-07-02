import CollaborationClient from "./CollaborationClient";

export const metadata = {
  title: "Collaboration & Contact | AryanVerse",
  description: "Get in touch with Aryan Chauhan for software development, data science projects, research collaborations, or editorial discussions.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/collaboration",
  },
};

export default function Page() {
  return <CollaborationClient />;
}
