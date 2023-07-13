/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:'http',
        hostname: '*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname: '*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname: '*.fbcdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
