/**
 * Destinations Configuration Data — AryanVerse
 * 
 * Defines the 6 interactive locations, their 3D positioning (ring layout),
 * descriptions, icons, and holographic geometry properties.
 */

export const destinations = [
  {
    id: "about",
    label: "About Headquarters",
    description: "The central hub of AryanVerse. Discover my story, principles, and philosophy.",
    icon: "User",
    // Placed in a circular ring at radius 2.6 around the center planet
    position: [0, 2.6, 0], 
    geometryType: "sphere",
    color: "#C084FC" // Glow purple
  },
  {
    id: "skills",
    label: "Skills District",
    description: "A torus network displaying my expertise in Data Science, React, and Python.",
    icon: "Code",
    position: [2.25, 1.3, 0],
    geometryType: "torusKnot",
    color: "#3B82F6" // Electric blue
  },
  {
    id: "projects",
    label: "Projects Lab",
    description: "Futuristic technology station visualizing launched projects and systems.",
    icon: "Rocket",
    position: [2.25, -1.3, 0],
    geometryType: "dodecahedron",
    color: "#A855F7" // Accent purple
  },
  {
    id: "journey",
    label: "Journey Archive",
    description: "A memory vault stepping through key phases of my growth and milestones.",
    icon: "History",
    position: [0, -2.6, 0],
    geometryType: "cylinder",
    color: "#7B2FBE" // Primary purple
  },
  {
    id: "blog",
    label: "Blog Library",
    description: "Digital cosmic library housing structured databases of articles and thoughts.",
    icon: "BookOpen",
    position: [-2.25, -1.3, 0],
    geometryType: "octahedron",
    color: "#22C55E" // Status green
  },
  {
    id: "future",
    label: "Future Command Center",
    description: "A pulsing beacon charting out-of-world milestones and research aspirations.",
    icon: "Compass",
    position: [-2.25, 1.3, 0],
    geometryType: "spire",
    color: "#E2E8F0" // Bright slate/white
  }
];
