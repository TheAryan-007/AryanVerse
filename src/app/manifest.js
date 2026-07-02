export default function manifest() {
  return {
    name: 'AryanVerse — Cinematic 3D Universe',
    short_name: 'AryanVerse',
    description: 'The futuristic digital universe showcasing projects, skills, and creations of Aryan Chauhan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#7b2fbe',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/x-icon',
      }
    ],
  };
}
