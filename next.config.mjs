/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'media.themoviedb.org' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
