/** @type {import('next').NextConfig} */

const apiHost = process.env.API_URL || 'http://localhost:8080'

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiHost}/:path*`,
      },
    ]
  }
}

module.exports = nextConfig
