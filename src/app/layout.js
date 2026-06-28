import { Orbitron, Space_Mono, Inter, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "AryanVerse — Interactive 3D Portfolio",
  description: "Step into the cinematic 3D universe of Aryan Chauhan, a B.Tech Data Science student at Bennett University.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceMono.variable} ${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050508] text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}

