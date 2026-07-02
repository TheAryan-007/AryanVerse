import ArchiveClient from "./ArchiveClient";

export const metadata = {
  title: "Archive Vault | AryanVerse",
  description: "Browse the books, cinema vaults, character dossiers, wordcounts, and editorial reviews in the Archive of AryanVerse.",
  alternates: {
    canonical: "https://aryan-verse-kappa.vercel.app/archive",
  },
};

export default function Page() {
  return <ArchiveClient />;
}
