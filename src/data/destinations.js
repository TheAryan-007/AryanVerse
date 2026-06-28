/**
 * Destinations Configuration Data — AryanVerse
 * 
 * Defines the 6 interactive locations, their titles, colors, routes,
 * and 3D positioning (perfect circle layout).
 */

export const destinations = [
  {
    id: "about",
    label: "About Headquarters",
    route: "/about",
    geometryType: "teardrop",
    color: "#FF8F00" // Soul Stone (Orange)
  },
  {
    id: "skills",
    label: "Skills & Experience",
    route: "/skills",
    geometryType: "oval",
    color: "#FFD700" // Mind Stone (Yellow)
  },
  {
    id: "projects",
    label: "Projects Lab",
    route: "/projects",
    geometryType: "oblong",
    color: "#A855F7" // Power Stone (Purple)
  },
  {
    id: "journey",
    label: "Journey Archive",
    route: "/journey",
    geometryType: "emeraldCut",
    color: "#10B981" // Time Stone (Green)
  },
  {
    id: "blog",
    label: "The Archive",
    route: "/archive",
    geometryType: "rubyShard",
    color: "#EF4444" // Reality Stone (Red)
  },
  {
    id: "collaboration",
    label: "Collaboration Hub",
    route: "/collaboration",
    geometryType: "cube",
    color: "#3B82F6" // Space Stone (Blue)
  }
];

export const getNodePosition = (id, w, h) => {
  const yOffset = h * 0.08; // Offset downward to clear top screen margins
  switch (id) {
    case 'about': // Top-center
      return [0, h * 0.28 - yOffset, 0];
    case 'skills': // Upper-right quadrant
      return [w * 0.28, h * 0.14 - yOffset, 0];
    case 'projects': // Lower-right quadrant
      return [w * 0.28, -h * 0.14 - yOffset, 0];
    case 'journey': // Bottom-center bridge
      return [0, -h * 0.28 - yOffset, 0];
    case 'blog': // Lower-left quadrant
      return [-w * 0.28, -h * 0.14 - yOffset, 0];
    case 'collaboration': // Upper-left quadrant
      return [-w * 0.28, h * 0.14 - yOffset, 0];
    default:
      return [0, -yOffset, 0];
  }
};
