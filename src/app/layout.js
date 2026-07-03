import { Orbitron, Space_Mono, Inter, Dancing_Script, Playfair_Display, Audiowide, Cinzel } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
  weight: ["400", "500", "600", "700"],
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

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://aryan-verse-kappa.vercel.app"),
  title: {
    default: "AryanVerse | Aryan Chauhan",
    template: "%s | AryanVerse",
  },
  description: "Step into the cinematic 3D universe of Aryan Chauhan, a B.Tech Data Science student at Bennett University. Exploring projects, skills, blogs, books, and AI creations.",
  applicationName: "AryanVerse",
  keywords: [
    "Aryan Chauhan", "AryanVerse", "Bennett University", "Data Science Student", 
    "Creative Writer", "Full Stack Developer", "Three.js Portfolio", 
    "React Three Fiber", "Interactive Portfolio", "Cyberpunk Web Design"
  ],
  authors: [{ name: "Aryan Chauhan", url: "https://aryan-verse-kappa.vercel.app" }],
  creator: "Aryan Chauhan",
  publisher: "Aryan Chauhan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
  openGraph: {
    title: "AryanVerse | Aryan Chauhan",
    description: "Step into the cinematic 3D universe of Aryan Chauhan. Showcase of software projects, skills, creative writing, and data science research.",
    url: "https://aryan-verse-kappa.vercel.app",
    siteName: "AryanVerse",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AryanVerse Cinematic Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AryanVerse | Aryan Chauhan",
    description: "Step into the cinematic 3D universe of Aryan Chauhan. Showcase of software projects, skills, creative writing, and data science research.",
    creator: "@TheAryan_007",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "YOUR_GOOGLE_SITE_VERIFICATION_PLACEHOLDER",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aryan Chauhan",
  "url": "https://aryan-verse-kappa.vercel.app",
  "sameAs": [
    "https://www.linkedin.com/in/aryan-chauhan-0b05a3386",
    "https://github.com/TheAryan-007"
  ],
  "jobTitle": "Data Science Student & Software Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Bennett University"
  },
  "description": "Aryan Chauhan's interactive 3D portfolio showcasing projects, skills, and creative writing."
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceMono.variable} ${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} ${audiowide.variable} ${cinzel.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#050508] text-white overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

