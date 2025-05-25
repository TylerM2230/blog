/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // Remove middleware configuration since it's not compatible with static exports
  experimental: {
    // Remove any experimental features
  },
}

module.exports = nextConfig 