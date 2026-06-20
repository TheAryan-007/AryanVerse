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
    color: "#EF4444" // Glow red
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
    color: "#F97316" // Primary orange
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
    color: "#EAB308" // Bright yellow/gold
  }
];

export const getNodePosition = (id, w, h) => {
  switch (id) {
    case 'about': // Primary celestial body at top-center, moved downward slightly
      return [0, h * 0.28, 0];
    case 'future': // Upper-left quadrant
      return [-w * 0.32, h * 0.16, 0];
    case 'skills': // Upper-right quadrant
      return [w * 0.32, h * 0.16, 0];
    case 'blog': // Lower-left quadrant, moved downward slightly
      return [-w * 0.28, -h * 0.20, 0];
    case 'journey': // Bottom-center bridge, moved upward slightly
      return [0, -h * 0.28, 0];
    case 'projects': // Lower-right quadrant, moved slightly left
      return [w * 0.24, -h * 0.20, 0];
    default:
      return [0, 0, 0];
  }
};
