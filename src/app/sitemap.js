export default function sitemap() {
  const baseUrl = "https://aryan-verse-kappa.vercel.app";
  
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/journey",
    "/skills",
    "/archive",
    "/collaboration"
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  const projectSlugs = [
    "skysentry-ai",
    "echoes-within",
    "intern-ease",
    "bubble-blast",
    "aryanverse",
    "lyfchanger",
    "cafe-marketing",
    "unscripted-love",
    "project-nexus",
    "quantized-cosmos",
    "cinesuggest-ai"
  ];

  const projectRoutes = projectSlugs.map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticRoutes, ...projectRoutes];
}
